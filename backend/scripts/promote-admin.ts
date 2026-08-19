import { Role } from '../src/database/generated/prisma/enums.js';

export type PromotionStatus =
  | 'PROMOTED'
  | 'ALREADY_ADMIN'
  | 'USER_NOT_FOUND'
  | 'UNVERIFIED_USER'
  | 'INVALID_INPUT';

export interface PromotionResult {
  status: PromotionStatus;
  message: string;
  user?: {
    id: string;
    email: string;
    displayName: string;
    previousRole: Role;
    newRole: Role;
  };
}

export interface MinimalPrismaClient {
  user: {
    findUnique: (args: {
      where: { email: string };
      select?: {
        id: true;
        email: true;
        displayName: true;
        emailVerified: true;
        role: true;
      };
    }) => Promise<{
      id: string;
      email: string;
      displayName: string;
      emailVerified: boolean;
      role: Role;
    } | null>;
    update: (args: {
      where: { id: string };
      data: { role: Role };
      select: {
        id: true;
        email: true;
        displayName: true;
        role: true;
      };
    }) => Promise<{
      id: string;
      email: string;
      displayName: string;
      role: Role;
    }>;
  };
  $disconnect?: () => Promise<void>;
}

export function parseEmailArg(args: string[]): string | undefined {
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--email' && args[i + 1] && !args[i + 1].startsWith('--')) {
      return args[i + 1];
    }
    if (arg.startsWith('--email=')) {
      const value = arg.slice('--email='.length);
      return value.length > 0 ? value : undefined;
    }
  }
  return undefined;
}

export async function promoteUserToAdmin(
  prisma: MinimalPrismaClient,
  rawEmail?: string,
): Promise<PromotionResult> {
  const email = rawEmail?.trim().toLowerCase();

  if (!email || !email.includes('@') || email.startsWith('@') || email.endsWith('@')) {
    return {
      status: 'INVALID_INPUT',
      message: 'A valid email address is required via --email <user-email>.',
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      displayName: true,
      emailVerified: true,
      role: true,
    },
  });

  if (!user) {
    return {
      status: 'USER_NOT_FOUND',
      message: `User with email "${email}" was not found. Please register the user account normally first.`,
    };
  }

  if (user.role === Role.ADMIN) {
    return {
      status: 'ALREADY_ADMIN',
      message: `User "${email}" is already an ADMIN. No database update performed.`,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        previousRole: Role.ADMIN,
        newRole: Role.ADMIN,
      },
    };
  }

  if (!user.emailVerified) {
    return {
      status: 'UNVERIFIED_USER',
      message: `User "${email}" has not verified their email. The account must be verified before promotion to ADMIN.`,
    };
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { role: Role.ADMIN },
    select: {
      id: true,
      email: true,
      displayName: true,
      role: true,
    },
  });

  return {
    status: 'PROMOTED',
    message: `User "${email}" was successfully promoted to ADMIN.`,
    user: {
      id: updatedUser.id,
      email: updatedUser.email,
      displayName: updatedUser.displayName,
      previousRole: user.role,
      newRole: updatedUser.role,
    },
  };
}

export async function runCli(args: string[]): Promise<number> {
  const email = parseEmailArg(args);

  if (!email) {
    console.error('[ERROR] Missing required argument: --email <user-email>');
    console.error('Usage: pnpm admin:promote --email <existing-verified-user-email>');
    return 1;
  }

  const { PrismaPg } = await import('@prisma/adapter-pg');
  const { PrismaClient } = await import('../src/database/generated/prisma/client.js');
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

  try {
    const result = await promoteUserToAdmin(prisma, email);

    if (result.status === 'PROMOTED') {
      console.log(`[SUCCESS] ${result.message}`);
      if (result.user) {
        console.log(`  User ID:       ${result.user.id}`);
        console.log(`  Email:         ${result.user.email}`);
        console.log(`  Display Name:  ${result.user.displayName}`);
        console.log(`  Previous Role: ${result.user.previousRole}`);
        console.log(`  New Role:      ${result.user.newRole}`);
      }
      return 0;
    }

    if (result.status === 'ALREADY_ADMIN') {
      console.log(`[INFO] (ALREADY_ADMIN) ${result.message}`);
      return 0;
    }

    console.error(`[ERROR] (${result.status}) ${result.message}`);
    return 1;
  } catch (error) {
    console.error('[ERROR] Unexpected failure during admin promotion:', error);
    return 1;
  } finally {
    if (prisma.$disconnect) {
      await prisma.$disconnect();
    }
  }
}

if (require.main === module) {
  void runCli(process.argv.slice(2)).then((code) => {
    process.exit(code);
  });
}

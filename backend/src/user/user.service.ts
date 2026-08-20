import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { BcryptService } from '../infrastructure/hash/bcrypt.service';
import { AuthProvider } from '../database/generated/prisma/enums';
import { Prisma, User } from '../database/generated/prisma/client';

export type CreateUserInput = {
  displayName: string;
  email: string;
  passwordHash: string;
};

export type CreateUserWithAccountInput = {
  displayName: string;
  email: string;
  provider: AuthProvider;
  providerAccountId: string;
  avatarUrl?: string;
};

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(data: CreateUserInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findUserByProviderAccount(
    provider: AuthProvider,
    providerAccountId: string,
  ): Promise<User | null> {
    const account = await this.prisma.account.findUnique({
      where: { provider_providerAccountId: { provider, providerAccountId } },
      include: { user: true },
    });
    return account?.user ?? null;
  }

  linkAccount(
    userId: string,
    provider: AuthProvider,
    providerAccountId: string,
  ) {
    return this.prisma.account.create({
      data: { userId, provider, providerAccountId },
    });
  }

  createUserWithAccount(data: CreateUserWithAccountInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        displayName: data.displayName,
        email: data.email,
        avatarUrl: data.avatarUrl,
        emailVerified: true,
        accounts: {
          create: {
            provider: data.provider,
            providerAccountId: data.providerAccountId,
          },
        },
      },
    });
  }

  updateAvatarUrl(userId: string, avatarUrl: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
    });
  }

  updateDisplayName(userId: string, displayName: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { displayName },
    });
  }

  async updatePassword(
    userId: string,
    password: string,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<User> {
    const passwordHash = await this.bcryptService.hash(password);
    return tx.user.update({
      where: { id: userId },
      data: { passwordHash },
    });
  }

  async getPublicProfile(id: string) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async updateMe(
    userId: string,
    displayName: string,
    avatarUrl?: string | null,
  ) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        displayName,
        ...(avatarUrl !== undefined
          ? { avatarUrl: avatarUrl?.trim() || null }
          : {}),
      },
    });

    return {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      avatarUrl: user.avatarUrl,
      role: user.role,
    };
  }
}

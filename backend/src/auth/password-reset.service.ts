import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '../database/generated/prisma/client';

const OTP_TTL_MS = 5 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;

@Injectable()
export class PasswordResetService {
  constructor(private readonly prisma: PrismaService) {}

  findLatestActive(userId: string) {
    return this.prisma.passwordReset.findFirst({
      where: { userId, used: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(userId: string, tokenHash: string) {
    const now = Date.now();
    return this.prisma.passwordReset.create({
      data: {
        userId,
        tokenHash,
        expiresAt: new Date(now + OTP_TTL_MS),
        resendAvailableAt: new Date(now + RESEND_COOLDOWN_MS),
      },
    });
  }

  markUsed(id: string, tx: Prisma.TransactionClient = this.prisma) {
    return tx.passwordReset.update({
      where: { id },
      data: { used: true },
    });
  }
}

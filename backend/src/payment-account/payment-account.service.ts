import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpsertPaymentAccountDto } from './dto/upsert-payment-account.dto';

@Injectable()
export class PaymentAccountService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly paymentAccountSelect = {
    id: true,
    userId: true,
    paymentType: true,
    accountName: true,
    promptPayNumber: true,
    qrCodeUrl: true,
    createdAt: true,
    updatedAt: true,
  } as const;

  findByUserId(userId: string) {
    return this.prisma.paymentAccount.findUnique({
      where: { userId },
      select: this.paymentAccountSelect,
    });
  }

  upsert(userId: string, dto: UpsertPaymentAccountDto) {
    return this.prisma.paymentAccount.upsert({
      where: { userId },
      create: {
        userId,
        paymentType: dto.paymentType,
        accountName: dto.accountName,
        promptPayNumber: dto.promptPayNumber,
        qrCodeUrl: dto.qrCodeUrl ?? null,
      },
      update: {
        paymentType: dto.paymentType,
        accountName: dto.accountName,
        promptPayNumber: dto.promptPayNumber,
        qrCodeUrl: dto.qrCodeUrl ?? null,
      },
      select: this.paymentAccountSelect,
    });
  }
}

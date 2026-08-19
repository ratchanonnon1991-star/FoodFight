import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { LocalStorageService } from '../infrastructure/storage/local-storage.service';
import { UpsertPaymentAccountDto } from './dto/upsert-payment-account.dto';

@Injectable()
export class PaymentAccountService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: LocalStorageService,
  ) {}

  async getForUser(userId: string) {
    const account = await this.prisma.paymentAccount.findUnique({
      where: { userId },
    });

    return account ? this.toResponse(account) : null;
  }

  async upsert(userId: string, dto: UpsertPaymentAccountDto) {
    const account = await this.prisma.paymentAccount.upsert({
      where: { userId },
      update: {
        type: dto.type,
        accountName: dto.accountName,
        promptPayId: dto.promptPayId,
      },
      create: {
        userId,
        type: dto.type,
        accountName: dto.accountName,
        promptPayId: dto.promptPayId,
      },
    });

    return this.toResponse(account);
  }

  async uploadQrImage(userId: string, file: Express.Multer.File) {
    const account = await this.prisma.paymentAccount.findUnique({
      where: { userId },
    });

    if (!account) {
      throw new NotFoundException(
        'Set up a payment account before uploading a QR code',
      );
    }

    const qrImageUrl = await this.storage.save(file, 'payment-accounts');
    await this.storage.delete(account.qrImageUrl);

    const updated = await this.prisma.paymentAccount.update({
      where: { userId },
      data: { qrImageUrl },
    });

    return this.toResponse(updated);
  }

  async removeQrImage(userId: string) {
    const account = await this.prisma.paymentAccount.findUnique({
      where: { userId },
    });

    if (!account) {
      throw new NotFoundException('Payment account not found');
    }

    await this.storage.delete(account.qrImageUrl);

    const updated = await this.prisma.paymentAccount.update({
      where: { userId },
      data: { qrImageUrl: null },
    });

    return this.toResponse(updated);
  }

  private toResponse(account: {
    id: string;
    type: string;
    accountName: string;
    promptPayId: string;
    qrImageUrl: string | null;
    updatedAt: Date;
  }) {
    return {
      id: account.id,
      type: account.type,
      accountName: account.accountName,
      promptPayId: account.promptPayId,
      qrImageUrl: account.qrImageUrl,
      updatedAt: account.updatedAt,
    };
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  BillStatus,
  OcrStatus,
  Prisma,
} from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { ReceiptOcrService } from '../infrastructure/ocr/receipt-ocr.service';
import { LocalStorageService } from '../infrastructure/storage/local-storage.service';
import { BillAccessService } from './bill-access.service';
import { BillDetailService } from './bill-detail.service';
import { UpsertReceiptItemDto } from './dto/upsert-receipt-item.dto';

@Injectable()
export class ReceiptService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: LocalStorageService,
    private readonly ocr: ReceiptOcrService,
    private readonly billAccess: BillAccessService,
    private readonly billDetail: BillDetailService,
  ) {}

  async uploadReceipt(
    userId: string,
    billId: string,
    file: Express.Multer.File,
  ) {
    const bill = await this.billAccess.loadOrThrow(billId);
    this.billAccess.assertCreator(bill, userId);
    this.assertEditable(bill.status);

    const imageUrl = await this.storage.save(file, 'receipts');
    await this.storage.delete(bill.receipt?.imageUrl);

    const ocrResult = this.ocr.isConfigured()
      ? await this.ocr.extractItems(file.buffer, file.mimetype)
      : null;

    const ocrStatus = ocrResult
      ? ocrResult.ok
        ? OcrStatus.COMPLETED
        : OcrStatus.FAILED
      : OcrStatus.NOT_USED;
    const parsedData: Prisma.InputJsonValue | undefined = ocrResult?.ok
      ? {
          items: ocrResult.items.map((item) => ({ ...item })),
          serviceCharge: ocrResult.serviceCharge,
          tax: ocrResult.tax,
          discount: ocrResult.discount,
        }
      : undefined;

    await this.prisma.$transaction(async (tx) => {
      await tx.receipt.upsert({
        where: { billId },
        update: { imageUrl, ocrStatus, parsedData },
        create: { billId, imageUrl, ocrStatus, parsedData },
      });

      if (ocrResult?.ok && ocrResult.items.length > 0) {
        // Rescanning replaces the item list with the fresh OCR read.
        await tx.receiptItem.deleteMany({ where: { billId } });
        await tx.receiptItem.createMany({
          data: ocrResult.items.map((item) => ({
            billId,
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.unitPrice * item.quantity,
          })),
        });
      }

      // Pre-fill the charges the receipt already shows, so the creator can
      // just review/confirm on the summary step instead of retyping them.
      if (
        ocrResult?.ok &&
        (ocrResult.serviceCharge > 0 ||
          ocrResult.tax > 0 ||
          ocrResult.discount > 0)
      ) {
        await tx.bill.update({
          where: { id: billId },
          data: {
            serviceCharge: ocrResult.serviceCharge,
            tax: ocrResult.tax,
            discount: ocrResult.discount,
          },
        });
      }
    });

    return this.billDetail.getDetail(userId, billId);
  }

  async addItem(userId: string, billId: string, dto: UpsertReceiptItemDto) {
    const bill = await this.billAccess.loadOrThrow(billId);
    this.billAccess.assertCreator(bill, userId);
    this.assertEditable(bill.status);

    await this.prisma.receiptItem.create({
      data: {
        billId,
        name: dto.name,
        quantity: dto.quantity,
        unitPrice: dto.unitPrice,
        totalPrice: dto.unitPrice * dto.quantity,
      },
    });

    return this.billDetail.getDetail(userId, billId);
  }

  async updateItem(
    userId: string,
    billId: string,
    itemId: string,
    dto: UpsertReceiptItemDto,
  ) {
    const bill = await this.billAccess.loadOrThrow(billId);
    this.billAccess.assertCreator(bill, userId);
    this.assertEditable(bill.status);

    const item = bill.items.find((existing) => existing.id === itemId);
    if (!item) {
      throw new NotFoundException('Item not found');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.receiptItem.update({
        where: { id: itemId },
        data: {
          name: dto.name,
          quantity: dto.quantity,
          unitPrice: dto.unitPrice,
          totalPrice: dto.unitPrice * dto.quantity,
        },
      });

      // Price changed - shares that were split from the old total no longer add up.
      if (item.shares.length > 0) {
        await tx.itemShare.deleteMany({ where: { receiptItemId: itemId } });
      }
    });

    return this.billDetail.getDetail(userId, billId);
  }

  async deleteItem(userId: string, billId: string, itemId: string) {
    const bill = await this.billAccess.loadOrThrow(billId);
    this.billAccess.assertCreator(bill, userId);
    this.assertEditable(bill.status);

    const item = bill.items.find((existing) => existing.id === itemId);
    if (!item) {
      throw new NotFoundException('Item not found');
    }

    await this.prisma.receiptItem.delete({ where: { id: itemId } });

    return this.billDetail.getDetail(userId, billId);
  }

  private assertEditable(status: BillStatus) {
    if (
      status === BillStatus.COMPLETED ||
      status === BillStatus.CLOSED ||
      status === BillStatus.CANCELLED
    ) {
      throw new ConflictException('This bill is already finalized');
    }
  }
}

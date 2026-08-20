import { Module } from '@nestjs/common';
import { ReceiptOcrService } from './receipt-ocr.service';

@Module({
  providers: [ReceiptOcrService],
  exports: [ReceiptOcrService],
})
export class OcrModule {}

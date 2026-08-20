import { Module } from '@nestjs/common';
import { OcrModule } from '../infrastructure/ocr/ocr.module';
import { PromptPayModule } from '../infrastructure/promptpay/promptpay.module';
import { LocalStorageModule } from '../infrastructure/storage/local-storage.module';
import { BillAccessService } from './bill-access.service';
import { BillController } from './bill.controller';
import { BillDetailService } from './bill-detail.service';
import { CreateBillService } from './create-bill.service';
import { PaymentService } from './payment.service';
import { ReceiptService } from './receipt.service';
import { SplitService } from './split.service';

@Module({
  imports: [LocalStorageModule, PromptPayModule, OcrModule],
  controllers: [BillController],
  providers: [
    BillAccessService,
    BillDetailService,
    CreateBillService,
    ReceiptService,
    SplitService,
    PaymentService,
  ],
})
export class BillModule {}

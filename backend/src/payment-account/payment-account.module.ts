import { Module } from '@nestjs/common';
import { LocalStorageModule } from '../infrastructure/storage/local-storage.module';
import { PaymentAccountController } from './payment-account.controller';
import { PaymentAccountService } from './payment-account.service';

@Module({
  imports: [LocalStorageModule],
  controllers: [PaymentAccountController],
  providers: [PaymentAccountService],
  exports: [PaymentAccountService],
})
export class PaymentAccountModule {}

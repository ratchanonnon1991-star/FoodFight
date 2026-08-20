import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PaymentAccountController } from './payment-account.controller';
import { PaymentAccountService } from './payment-account.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentAccountController],
  providers: [PaymentAccountService],
})
export class PaymentAccountModule {}

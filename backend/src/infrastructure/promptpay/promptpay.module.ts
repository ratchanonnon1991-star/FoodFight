import { Module } from '@nestjs/common';
import { PromptPayService } from './promptpay.service';

@Module({
  providers: [PromptPayService],
  exports: [PromptPayService],
})
export class PromptPayModule {}

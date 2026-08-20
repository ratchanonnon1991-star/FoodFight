import { Body, Controller, Get, Put } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { UpsertPaymentAccountDto } from './dto/upsert-payment-account.dto';
import { PaymentAccountService } from './payment-account.service';

@Controller('payment-account')
export class PaymentAccountController {
  constructor(private readonly paymentAccountService: PaymentAccountService) {}

  @Get('me')
  getMe(@CurrentUser() currentUser: AccessTokenPayload) {
    return this.paymentAccountService.findByUserId(currentUser.sub);
  }

  @Put('me')
  upsertMe(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Body() dto: UpsertPaymentAccountDto,
  ) {
    return this.paymentAccountService.upsert(currentUser.sub, dto);
  }
}

import { Body, Controller, Get, Put, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { UpsertPaymentAccountDto } from './dto/upsert-payment-account.dto';
import { PaymentAccountService } from './payment-account.service';

@Controller('payment-account')
export class PaymentAccountController {
  constructor(private readonly paymentAccountService: PaymentAccountService) {}

  @Get('me')
  async getMe(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Res() res: Response,
  ) {
    const account = await this.paymentAccountService.findByUserId(
      currentUser.sub,
    );
    // Express/Nest send an empty body (not JSON "null") for a nil return value,
    // which breaks clients that always call response.json() — serialize explicitly.
    res.status(200).json(account);
  }

  @Put('me')
  upsertMe(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Body() dto: UpsertPaymentAccountDto,
  ) {
    return this.paymentAccountService.upsert(currentUser.sub, dto);
  }
}

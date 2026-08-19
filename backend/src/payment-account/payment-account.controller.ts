import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { UpsertPaymentAccountDto } from './dto/upsert-payment-account.dto';
import { PaymentAccountService } from './payment-account.service';

@Controller('payment-account')
export class PaymentAccountController {
  constructor(private readonly paymentAccountService: PaymentAccountService) {}

  @Get()
  getMyAccount(@CurrentUser() currentUser: AccessTokenPayload) {
    return this.paymentAccountService.getForUser(currentUser.sub);
  }

  @Put()
  upsertMyAccount(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Body() dto: UpsertPaymentAccountDto,
  ) {
    return this.paymentAccountService.upsert(currentUser.sub, dto);
  }

  @Post('qr')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  uploadQrImage(
    @CurrentUser() currentUser: AccessTokenPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.paymentAccountService.uploadQrImage(currentUser.sub, file);
  }

  @Delete('qr')
  removeQrImage(@CurrentUser() currentUser: AccessTokenPayload) {
    return this.paymentAccountService.removeQrImage(currentUser.sub);
  }
}

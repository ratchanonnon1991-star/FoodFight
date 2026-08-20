import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class UpsertPaymentAccountDto {
  @IsString()
  @IsIn(['PROMPTPAY'])
  paymentType: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Trim()
  accountName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @Matches(/^[0-9+\-\s]+$/)
  @Trim()
  promptPayNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(7_000_000)
  qrCodeUrl?: string | null;
}

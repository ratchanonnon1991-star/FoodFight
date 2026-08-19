import { Transform } from 'class-transformer';
import { IsIn, IsString, Length, Matches } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class UpsertPaymentAccountDto {
  @IsIn(['PROMPTPAY'])
  type: 'PROMPTPAY';

  @IsString()
  @Trim()
  @Length(1, 100)
  accountName: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.replace(/[^0-9]/g, '') : value,
  )
  @IsString()
  @Matches(/^(0\d{9}|\d{13})$/, {
    message:
      'PromptPay ID must be a 10-digit mobile number or a 13-digit citizen ID',
  })
  promptPayId: string;
}

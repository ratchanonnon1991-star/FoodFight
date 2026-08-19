import { IsIn } from 'class-validator';

export class SetPaymentStatusDto {
  @IsIn(['PAID', 'UNPAID'])
  status: 'PAID' | 'UNPAID';
}

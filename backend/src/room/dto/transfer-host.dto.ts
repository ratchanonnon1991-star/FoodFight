import { IsUUID } from 'class-validator';

export class TransferHostDto {
  @IsUUID()
  memberId: string;
}

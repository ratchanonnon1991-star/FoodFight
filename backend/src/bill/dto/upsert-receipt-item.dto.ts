import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class UpsertReceiptItemDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @Length(1, 100)
  name: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  unitPrice: number;
}

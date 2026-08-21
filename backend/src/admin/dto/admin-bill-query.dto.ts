import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BillStatus } from '../../database/generated/prisma/enums';
import { Trim } from '../../common/decorators/trim.decorator';

export class AdminBillQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Trim()
  search?: string;

  @IsOptional()
  @IsEnum(BillStatus)
  status?: BillStatus;
}

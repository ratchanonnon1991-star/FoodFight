import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class CalculateSummaryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  serviceCharge?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  tax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  discount?: number;
}

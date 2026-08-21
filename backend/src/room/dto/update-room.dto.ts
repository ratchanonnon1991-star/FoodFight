import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Trim } from '../../common/decorators/trim.decorator';

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  @Trim()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(2)
  @Max(15)
  maxMembers?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  locationName?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([1, 3, 5, 10])
  searchRadiusKm?: number;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;
}

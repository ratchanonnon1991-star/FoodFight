import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class UpsertFoodProfileDto {
  @IsArray()
  @IsString({ each: true })
  allergies: string[];

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Trim()
  otherAllergies?: string | null;

  @IsArray()
  @IsString({ each: true })
  restrictions: string[];

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Trim()
  otherRestrictions?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Trim()
  additionalNotes?: string | null;
}

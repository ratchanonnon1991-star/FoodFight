import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export type FrontendMealPreferenceBudget = 'LOW' | 'MID' | 'HIGH' | 'ANY';

export class UpsertMealPreferenceDto {
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(50, { each: true })
  cookingMethods: string[];

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Trim()
  cookingMethodsOther?: string | null;

  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(50, { each: true })
  cuisines: string[];

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Trim()
  cuisinesOther?: string | null;

  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(50, { each: true })
  proteins: string[];

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Trim()
  proteinsOther?: string | null;

  @IsOptional()
  @IsIn(['LOW', 'MID', 'HIGH', 'ANY'])
  budget?: FrontendMealPreferenceBudget;

  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(50, { each: true })
  restaurantStyles: string[];

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Trim()
  restaurantStylesOther?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @Trim()
  additionalNuances?: string | null;
}

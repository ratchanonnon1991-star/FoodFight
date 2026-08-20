import { ArrayUnique, IsArray, IsOptional, IsString } from 'class-validator';

export class SplitEvenlyDto {
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  userIds?: string[];
}

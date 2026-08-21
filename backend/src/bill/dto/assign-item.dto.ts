import { ArrayUnique, IsArray, IsString } from 'class-validator';

export class AssignItemDto {
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  userIds: string[];
}

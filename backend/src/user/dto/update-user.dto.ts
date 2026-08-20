import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  displayName: string;

  @IsOptional()
  @IsString()
  @MaxLength(7_000_000)
  @Trim()
  avatarUrl?: string | null;
}

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class GoogleLoginDto {
  @IsString()
  @IsNotEmpty()
  idToken: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  displayName?: string;
}

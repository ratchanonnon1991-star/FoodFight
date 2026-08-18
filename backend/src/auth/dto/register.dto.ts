import {
  Equals,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsBoolean()
  @Equals(true)
  agreeToTerms: boolean;
}

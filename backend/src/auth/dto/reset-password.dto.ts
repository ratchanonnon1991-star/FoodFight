import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  @IsNumberString()
  otp: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

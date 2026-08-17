import {
  Equals,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';
import { PasswordsMatchConstraint } from '../../common/validators/passwords-match.validator';

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

  @IsNotEmpty()
  @IsString()
  @Validate(PasswordsMatchConstraint)
  confirmPassword: string;

  @IsBoolean()
  @Equals(true)
  agreeToTerms: boolean;
}

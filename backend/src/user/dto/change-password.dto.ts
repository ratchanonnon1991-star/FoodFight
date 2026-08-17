import { IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { PasswordsMatchConstraint } from '../../common/validators/passwords-match.validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Validate(PasswordsMatchConstraint)
  confirmPassword: string;
}

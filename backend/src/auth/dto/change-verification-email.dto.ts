import { IsEmail, IsNotEmpty } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class ChangeVerificationEmailDto {
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  currentEmail: string;

  @IsEmail()
  @IsNotEmpty()
  @Trim()
  newEmail: string;
}

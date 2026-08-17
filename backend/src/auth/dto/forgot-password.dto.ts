import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class ForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  email: string;
}

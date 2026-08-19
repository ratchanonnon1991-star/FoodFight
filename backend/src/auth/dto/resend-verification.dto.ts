import { IsEmail, IsNotEmpty } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class ResendVerificationDto {
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  email: string;
}

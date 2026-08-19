import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class VerifyEmailDto {
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  email: string;

  @IsString()
  @Length(6, 6)
  code: string;
}

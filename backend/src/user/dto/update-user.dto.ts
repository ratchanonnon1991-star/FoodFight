import { IsNotEmpty, IsString } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  displayName: string;
}

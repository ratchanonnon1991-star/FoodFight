import { IsNotEmpty, IsString } from 'class-validator';

export class LineCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}

import { Module } from '@nestjs/common';
import { LineAuthService } from './line-auth.service';

@Module({
  providers: [LineAuthService],
  exports: [LineAuthService],
})
export class LineAuthModule {}

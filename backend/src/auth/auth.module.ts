import { Module } from '@nestjs/common';
import { JwtModule } from '../infrastructure/jwt/jwt.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

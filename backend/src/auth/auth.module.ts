import { Module } from '@nestjs/common';
import { JwtModule } from '../infrastructure/jwt/jwt.module';
import { HashModule } from '../infrastructure/hash/hash.module';
import { GoogleAuthModule } from '../infrastructure/google/google-auth.module';
import { LineAuthModule } from '../infrastructure/line/line-auth.module';
import { MailModule } from '../infrastructure/mail/mail.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordResetService } from './password-reset.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule,
    HashModule,
    GoogleAuthModule,
    LineAuthModule,
    MailModule,
    UserModule,
  ],
  providers: [AuthService, PasswordResetService],
  controllers: [AuthController],
})
export class AuthModule {}

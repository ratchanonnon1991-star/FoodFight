import { Module } from '@nestjs/common';
import { HashModule } from '../infrastructure/hash/hash.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [HashModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

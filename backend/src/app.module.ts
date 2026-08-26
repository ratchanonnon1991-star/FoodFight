import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { validate } from './config/env.validation';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './infrastructure/jwt/jwt.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { RoomModule } from './room/room.module';
import { FoodProfileModule } from './food-profile/food-profile.module';
import { PaymentAccountModule } from './payment-account/payment-account.module';
import { HistoryModule } from './history/history.module';
import { BillModule } from './bill/bill.module';
import { RecommendationAiModule } from './recommendation-ai/recommendation-ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    DatabaseModule,
    JwtModule,
    AuthModule,
    UserModule,
    RoomModule,
    FoodProfileModule,
    PaymentAccountModule,
    HistoryModule,
    BillModule,
    RecommendationAiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

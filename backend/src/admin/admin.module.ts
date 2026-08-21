import { Module } from '@nestjs/common';
import { AdminDashboardController } from './controllers/admin-dashboard.controller';
import { AdminDashboardService } from './services/admin-dashboard.service';
import { AdminUsersController } from './controllers/admin-users.controller';
import { AdminUsersService } from './services/admin-users.service';
import { AdminAnalyticsController } from './controllers/admin-analytics.controller';
import { AdminAnalyticsService } from './services/admin-analytics.service';
import { RuleBasedAnalyticsIntelligenceProvider } from './services/admin-analytics-intelligence.service';
import { AdminAnalyticsTrendsService } from './services/admin-analytics-trends.service';
import { AdminRoomsController } from './controllers/admin-rooms.controller';
import { AdminRoomsService } from './services/admin-rooms.service';
import { AdminBillsController } from './controllers/admin-bills.controller';
import { AdminBillsService } from './services/admin-bills.service';

@Module({
  controllers: [
    AdminDashboardController,
    AdminUsersController,
    AdminAnalyticsController,
    AdminRoomsController,
    AdminBillsController,
  ],
  providers: [
    AdminDashboardService,
    AdminUsersService,
    AdminAnalyticsTrendsService,
    AdminAnalyticsService,
    RuleBasedAnalyticsIntelligenceProvider,
    AdminRoomsService,
    AdminBillsService,
  ],
  exports: [AdminDashboardService, AdminUsersService, AdminAnalyticsService],
})
export class AdminModule {}

import { Module } from '@nestjs/common';
import { AdminDashboardController } from './controllers/admin-dashboard.controller';
import { AdminDashboardService } from './services/admin-dashboard.service';
import { AdminUsersController } from './controllers/admin-users.controller';
import { AdminUsersService } from './services/admin-users.service';
import { AdminAnalyticsController } from './controllers/admin-analytics.controller';
import { AdminAnalyticsService } from './services/admin-analytics.service';
import { RuleBasedAnalyticsIntelligenceProvider } from './services/admin-analytics-intelligence.service';

@Module({
  controllers: [
    AdminDashboardController,
    AdminUsersController,
    AdminAnalyticsController,
  ],
  providers: [
    AdminDashboardService,
    AdminUsersService,
    AdminAnalyticsService,
    RuleBasedAnalyticsIntelligenceProvider,
  ],
  exports: [AdminDashboardService, AdminUsersService, AdminAnalyticsService],
})
export class AdminModule {}

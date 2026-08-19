import { Module } from '@nestjs/common';
import { AdminDashboardController } from './controllers/admin-dashboard.controller';
import { AdminDashboardService } from './services/admin-dashboard.service';

@Module({
  controllers: [AdminDashboardController],
  providers: [AdminDashboardService],
  exports: [AdminDashboardService],
})
export class AdminModule {}

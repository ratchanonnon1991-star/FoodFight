import { Module } from '@nestjs/common';
import { AdminDashboardController } from './controllers/admin-dashboard.controller';
import { AdminDashboardService } from './services/admin-dashboard.service';
import { AdminUsersController } from './controllers/admin-users.controller';
import { AdminUsersService } from './services/admin-users.service';

@Module({
  controllers: [AdminDashboardController, AdminUsersController],
  providers: [AdminDashboardService, AdminUsersService],
  exports: [AdminDashboardService, AdminUsersService],
})
export class AdminModule {}

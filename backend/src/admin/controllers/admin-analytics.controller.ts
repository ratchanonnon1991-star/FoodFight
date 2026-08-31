import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Role } from '../../database/generated/prisma/enums';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AdminAnalyticsQueryDto } from '../dto/admin-analytics-query.dto';
import { AdminAnalyticsService } from '../services/admin-analytics.service';

@Controller('admin/analytics')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
export class AdminAnalyticsController {
  constructor(private readonly adminAnalyticsService: AdminAnalyticsService) {}

  @Get()
  getAnalytics(@Query() query: AdminAnalyticsQueryDto) {
    return this.adminAnalyticsService.getAnalytics(query);
  }
}

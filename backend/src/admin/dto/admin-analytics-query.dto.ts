import { IsEnum, IsOptional } from 'class-validator';

export enum AdminAnalyticsRange {
  SEVEN_DAYS = '7d',
  THIRTY_DAYS = '30d',
  ALL = 'all',
}

export class AdminAnalyticsQueryDto {
  @IsOptional()
  @IsEnum(AdminAnalyticsRange)
  range: AdminAnalyticsRange = AdminAnalyticsRange.THIRTY_DAYS;
}

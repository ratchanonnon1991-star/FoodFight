import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('me')
  getMe(@CurrentUser() currentUser: AccessTokenPayload) {
    return this.historyService.findByUserId(currentUser.sub);
  }
}

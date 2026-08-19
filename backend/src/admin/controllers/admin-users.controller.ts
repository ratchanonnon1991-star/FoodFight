import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Role } from '../../database/generated/prisma/enums';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AdminUsersService } from '../services/admin-users.service';
import { AdminUserQueryDto } from '../dto/admin-user-query.dto';

@Controller('admin/users')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  getUsers(@Query() query: AdminUserQueryDto) {
    return this.adminUsersService.getUsers(query);
  }
}

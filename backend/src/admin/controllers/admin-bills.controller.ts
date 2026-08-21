import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Role } from '../../database/generated/prisma/enums';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AdminBillQueryDto } from '../dto/admin-bill-query.dto';
import { AdminBillsService } from '../services/admin-bills.service';

@Controller('admin/bills')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
export class AdminBillsController {
  constructor(private readonly adminBillsService: AdminBillsService) {}

  @Get()
  getBills(@Query() query: AdminBillQueryDto) {
    return this.adminBillsService.getBills(query);
  }

  @Get(':billId')
  getBillById(@Param('billId') billId: string) {
    return this.adminBillsService.getBillById(billId);
  }
}

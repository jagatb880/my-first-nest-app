import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles/roles.guard';
import { Role } from '../guards/roles/roles.enums';
import { Roles } from '../guards/roles/roles.decorator';

@Controller('user-roles')
export class UserRolesController {
  @Get('admin-data')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN) // Custom guard to check if the user is an admin
  getAdminData() {
    return { message: 'Only admin can access this data.' };
  }

  @Get('user-data')
  @UseGuards(RolesGuard)
  @Roles(Role.USER) // Custom guard to check if the user is a regular user
  getUserData() {
    return { message: 'Only regular users can access this data.' };
  }
}

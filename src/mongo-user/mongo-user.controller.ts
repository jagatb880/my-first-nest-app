import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './schema/user.schema';
import { MongoUserService } from './mongo-user.service';

@Controller('mongo-user')
export class MongoUserController {
  constructor(private readonly userService: MongoUserService) {}

  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}

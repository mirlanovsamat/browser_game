import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService:UserService
  ) {}

  @Get('find-all')
  async findAll(@Query() query) {
    return this.userService.find(query)
  }

  @Get('get-all')
  async getAll(@Query() query) {
    return this.userService.findAll(query)
  }

  @Post('create')
  async createUser(@Body() body: CreateUserDto ) {
    return this.userService.create(body)
  }

}

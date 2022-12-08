import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRatingDto } from '../rating/dto/createRating.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService:UserService
  ) {}

  @Get('get-all')
  async getAll() {
    return this.userService.getAll()
  }

  @Post('create')
  async createUser(@Body() body: CreateUserDto ) {
    return this.userService.createUser(body)
  }

  @Post('create/rating')
  async createRating(@Body() body: CreateRatingDto ) {
    return this.userService.updateRating(body)
  }

}

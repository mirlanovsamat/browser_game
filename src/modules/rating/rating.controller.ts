import { RatingService } from './rating.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('rating')
export class RatingController {
  constructor(
    private readonly ratingService: RatingService,
  ) {}

  @Get('get-all')
  async getAll(@Query() query) {
    return this.ratingService.findAll(query)
  }

}

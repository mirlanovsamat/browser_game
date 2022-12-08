import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { Rating, RatingSchema } from 'src/models/rating.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Rating.name, schema: RatingSchema}]),
  ],
  controllers: [
    RatingController
  ],
  providers: [RatingService],
  exports: [RatingService]
})
export class RatingModule {}

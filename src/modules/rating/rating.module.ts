import { RatingController } from './rating.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from 'src/entities/rating.entity';
import { RatingService } from './rating.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rating]),
  ],
  controllers: [RatingController],
  providers: [RatingService],
  exports: [RatingService]
})
export class RatingModule {}

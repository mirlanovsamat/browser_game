import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from 'src/entities/rating.entity';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/createRating.dto';

@Injectable()
export class RatingService {
    constructor(
    @InjectRepository(Rating)
        private readonly ratingRepository: Repository<Rating>
    ){};

    async createRating(createRatingDto: CreateRatingDto) {
        return this.ratingRepository.save(createRatingDto)
    }
}

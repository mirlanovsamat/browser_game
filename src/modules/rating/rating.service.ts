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

    async create(createRatingDto: CreateRatingDto): Promise<Rating> {
        try {
            const rating = await this.ratingRepository.save(createRatingDto)
            return rating
        } catch (error) {
            return error
        }
    }
}

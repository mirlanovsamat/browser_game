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

    async findAll(query) {
        try {
            const skip = query.page === 1 ? 0 : (query.page - 1) * query.take;
            const [ result, total ] = await this.ratingRepository.findAndCount(
                {
                    order: { record: "DESC" },
                    take: query.take,
                    skip: skip || 0,
                    relations: ['user']
                })
            return {
                result: result,
                count: total
            }
        } catch (error) {
            return error
        }
    }
}

import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from '../rating/dto/createRating.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { RatingService } from '../rating/rating.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly ratingService: RatingService,
    ){};

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const user = await this.userRepository.save(createUserDto)
            return user
        } catch (error) {
           return error
        }
    }

    async findAll(query): Promise<User[]> {
        try {
            const skip = query.page === 1 ? 0 : (query.page - 1) * query.take;
            const users = await this.userRepository.find(
                {
                    order: { record: {record: "DESC"} },
                    take: query.take,
                    skip: skip || 0,
                    relations: ['record']
                }
            );
            return users
        } catch (error) {
            return error
        }
    }

    async createRating(createRatingDto: CreateRatingDto): Promise<any> {
        try {
            const rating = await this.ratingService.create(createRatingDto)
            return rating
        } catch (error) {
            return error
        }
    }
}

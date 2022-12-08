import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRatingDto } from '../rating/dto/createRating.dto';
import { RatingService } from '../rating/rating.service';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly ratingService: RatingService,
    ){};

    async createUser(createUserDto: CreateUserDto) {
        try {
            const user = await this.userRepository.save(createUserDto);
            return user
        } catch (error) {
            return error.detail
        }
    }

    async updateRating(createRatingDto: CreateRatingDto) {
        await this.ratingService.createRating(createRatingDto)
    }

    async getAll() {
        return this.userRepository.find({relations: ['rating']})
    }
}

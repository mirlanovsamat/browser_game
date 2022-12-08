import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user.model';
import { CreateRatingDto } from '../rating/dto/createRating.dto';
import { RatingService } from '../rating/rating.service';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<UserDocument>,
        private ratingService: RatingService
    ){};

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const createdUser = await this.userModel.create(createUserDto);
            return createdUser;
        } catch (error) {
            if (error.code === 11000) {
                throw new HttpException('Duplicated key', HttpStatus.BAD_REQUEST)
            }
            return error
        }
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().populate('record');
    }

    async createRating(createRatingDto: CreateRatingDto): Promise<any> {
        const rating = await this.ratingService.create(createRatingDto);
        await this.userModel.findByIdAndUpdate( rating.user,
            {
                $push: {
                    record: rating
                }
            }
        )
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating, RatingDocument } from 'src/models/rating.model';
import { CreateRatingDto } from './dto/createRating.dto';

@Injectable()
export class RatingService {
    constructor(
        @InjectModel(Rating.name) 
        private ratingModel: Model<RatingDocument>
    ){};

    async create(createRatingDto: CreateRatingDto): Promise<Rating> {
        const createdCat = await this.ratingModel.create(createRatingDto);
        return createdCat
    }
}

import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateRatingDto{
    
    @IsNotEmpty()
    record: number;

    @IsString()
    @IsNotEmpty()
    user: User;

}
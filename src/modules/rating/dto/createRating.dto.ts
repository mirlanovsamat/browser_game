import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/models/user.model';

export class CreateRatingDto{
    
    @IsString()
    @IsNotEmpty()
    record: string;

    @IsString()
    @IsNotEmpty()
    user: User;

}
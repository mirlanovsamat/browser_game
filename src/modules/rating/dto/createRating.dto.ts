import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateRatingDto{
    
    @IsString()
    @IsNotEmpty()
    record: string;

    @IsString()
    @IsNotEmpty()
    user: User;

}
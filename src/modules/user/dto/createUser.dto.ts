import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto{
    
    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => value?.trim())
    name: string;

}
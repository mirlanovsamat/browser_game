import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto{
    
    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => value?.trim())
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email

    @IsNumber()
    @IsNotEmpty()
    record: number

}
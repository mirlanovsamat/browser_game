import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { RatingModule } from '../rating/rating.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from 'src/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    RatingModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

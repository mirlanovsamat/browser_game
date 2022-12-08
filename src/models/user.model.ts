import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Rating } from './rating.model';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User {

  @Prop({ 
    required: true,
    unique: true,
  })
  name: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }])
  record: Rating;
}

export const UserSchema = SchemaFactory.createForClass(User);
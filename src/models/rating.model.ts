import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.model';

export type RatingDocument = mongoose.HydratedDocument<Rating>;

@Schema()
export class Rating {

  @Prop()
  record: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

}

export const RatingSchema = SchemaFactory.createForClass(Rating);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, default: '' })
  email: string;

  @Prop({ required: true, default: '' })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
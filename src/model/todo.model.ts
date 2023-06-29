import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.model';

export type TodoDocument = Todo & mongoose.Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true, default: '' })
  todo: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userID: User;

  @Prop({ required: true, default: false })
  isCompleted: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

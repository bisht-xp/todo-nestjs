import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TodoDocument = Todo & mongoose.Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true, default: '' })
  todo: string;
  @Prop({ required: true, default: false })
  isCompleted: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

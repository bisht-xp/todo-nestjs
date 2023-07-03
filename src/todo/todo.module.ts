import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoSchema } from '../model/todo.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
  //   ConfigModule.forRoot(),
  //   MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
  ],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}

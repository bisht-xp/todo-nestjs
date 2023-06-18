import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from 'src/model/todo.model';
import { newTask } from 'src/utils/constants';
import { Model } from 'mongoose';
dotenv.config();

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async createTodo(data: newTask) {
    let newTask = await this.todoModel.create({ ...data });
    newTask = await newTask.save();
    return {
      status: true,
      message: 'new task created successfully...',
      newTask,
    };
  }

  // allTodos() {
  //   return this.todos;
  // }

  // patchTodo(id) {
  //   console.log(id.id);
  //   // console.log(this.todos);
  //   for (let todo of this.todos) {
  //     // console.log(typeof todo._id);
  //     if (todo._id === id.id) {
  //       console.log(todo);
  //       todo.isCompleted = true;
  //     }
  //   }
  //   return 'fixed';
  // }
}

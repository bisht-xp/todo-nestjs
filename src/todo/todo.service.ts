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

  async createTodo(data: newTask, userID: string) {
    let createTask = {
      ...data,
      userID: userID,
    };
    let task = new this.todoModel(createTask);
    await task.save();
    return {
      status: true,
      message: 'new task created successfully...',
      task,
    };
  }

  allTodos() {
    const todos = this.todoModel.find().populate('userID');
    return todos;
  }

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

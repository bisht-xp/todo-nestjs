import { ForbiddenException, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from 'src/model/todo.model';
import { newTask } from 'src/utils/constants';
import { Model } from 'mongoose';
import { updateTodo } from './todo.dto';
dotenv.config();

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async createTodo(data: newTask, userID: string) {
    try {
      let task = {
        ...data,
        userID: userID,
      };
      let newTask = new this.todoModel(task);
      await newTask.save();
      return {
        status: true,
        message: 'new task created successfully...',
        newTask,
      };
    } catch (error) {
      throw error;
    }
  }

  getAllTodos() {
    const todos = this.todoModel.find().populate('userID');
    return todos;
  }

  async updateTask(id: string, data: updateTodo) {
    try {
      let task = await this.todoModel.findById({ _id: id });
      if (!task) {
        throw new ForbiddenException('There is no task to update');
      }
      await this.todoModel.updateOne({ _id: id }, { $set: { ...data } });
      return {
        status: 'true',
        message: 'Successfully update',
        task,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(id: string) {
    try {
      let task = await this.todoModel.findByIdAndDelete({ _id: id });
      return {
        status: 'true',
        message: 'Successfully Deleted',
      };
    } catch (error) {
      throw error;
    }
  }
}

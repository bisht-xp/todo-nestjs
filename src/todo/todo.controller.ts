import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { newTask, updateTodo } from './todo.dto';
import { TodoService } from './todo.service';
import { verifyAccessToken } from '../utils/jwt';

@Controller('')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('v1/add/task')
  async addTask(@Headers() headers: any, @Body() task: newTask) {
    try {
      const token = headers['x-access-token'];
      const data = await verifyAccessToken(token);
      return this.todoService.createTodo(task, data.userId);
    } catch (error) {
      throw error;
    }
  }

  @Get('v1/all')
  async showAllTask(@Headers() jwtToken: any) {
    try {
      const token = jwtToken['x-access-token'];
      const data = await verifyAccessToken(token);
      return this.todoService.getAllTodos();
    } catch (error) {
      throw error;
    }
  }

  @Put('v1/update/')
  async updateTodo(
    @Headers() jwtToken: any,
    @Query('id') id: string,
    @Body() data: updateTodo,
  ) {
    try {
      const token = jwtToken['x-access-token'];
      const tokenData = await verifyAccessToken(token);
      return this.todoService.updateTask(id, data);
    } catch (error) {
      throw error;
    }
  }

  @Delete('v1/delete')
  async deleteTodo(@Headers() jwtToken: any, @Query('id') id: string) {
    try {
      const token = jwtToken['x-access-token'];
      const tokenData = await verifyAccessToken(token);
      return this.todoService.deleteTask(id);
    } catch (error) {
      throw error;
    }
  }
}

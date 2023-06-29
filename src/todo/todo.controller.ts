import { Body, Controller, Get, Headers, Post, Put } from '@nestjs/common';
import { newTask } from './todo.dto';
import { TodoService } from './todo.service';
import { verifyAccessToken } from 'src/utils/jwt';

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
  showAllTask() {
    return this.todoService.allTodos();
  }

  // @Put('v1/update/:id')
  // update(@Param() id) {
  //   return this.todoService.patchTodo(id);
  // }
}

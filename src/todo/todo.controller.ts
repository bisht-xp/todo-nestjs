import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { newTask } from './todo.dto';
import { TodoService } from './todo.service';

@Controller('')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('v1/add')
  addTask(@Body() data: newTask) {
    return this.todoService.createTodo(data);
  }

  // @Get('v1/all')
  // showAllTask() {
  //   return this.todoService.allTodos();
  // }

  // @Put('v1/update/:id')
  // update(@Param() id) {
  //   return this.todoService.patchTodo(id);
  // }
}

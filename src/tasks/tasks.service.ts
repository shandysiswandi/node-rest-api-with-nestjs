import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateFieldTaskDto } from './dto/update-field-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(tasksFilter: GetTaskFilterDto): Task[] {
    const { search, status } = tasksFilter;

    let tasks = this.tasks;

    if (search) {
      tasks = this.tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    if (status) {
      tasks = this.tasks.filter((task) => task.status === status);
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    return task;
  }

  updateTaskById(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.getTaskById(id);

    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    task.status = updateTaskDto.status;

    return task;
  }

  updateFieldTaskById(
    id: string,
    updateFieldTaskDto: UpdateFieldTaskDto,
  ): Task {
    const task = this.getTaskById(id);

    if (updateFieldTaskDto.title) {
      task.title = updateFieldTaskDto.title;
    }

    if (updateFieldTaskDto.description) {
      task.description = updateFieldTaskDto.description;
    }

    if (updateFieldTaskDto.status) {
      task.status = updateFieldTaskDto.status;
    }

    return task;
  }

  deleteTaskById(id: string): void {
    const taskData = this.getTaskById(id);

    this.tasks = this.tasks.filter((task) => task.id !== taskData.id);
  }
}

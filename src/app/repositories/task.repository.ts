import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/task/create-task.dto';
import { GetTaskFilterDto } from '../dto/task/get-tasks-filter.dto';
import { TaskStatus } from '../types/task-status.enum';
import { Task } from '../../entities/task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  // getTasks
  async getTasks(taskFilter: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = taskFilter;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  // createTask
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }
}

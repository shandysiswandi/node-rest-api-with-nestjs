import { EntityRepository, Repository } from 'typeorm';
import { Task } from 'src/entities/task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> { }

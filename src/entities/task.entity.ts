import { Column, Entity } from 'typeorm';
import { TaskStatus } from '../app/types/task-status.enum';
import Base from './entity';

@Entity('tasks')
export class Task extends Base {
  constructor(partial?: Partial<Task>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ length: 100 })
  title: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.OPEN
  })
  status: TaskStatus;
}

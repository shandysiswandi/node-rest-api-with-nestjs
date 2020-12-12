import { Column, Entity } from 'typeorm';
import { TaskStatus } from 'src/app/task/task.type';
import BaseEntity from 'src/entities/entity';

@Entity('tasks')
export class Task extends BaseEntity {
  constructor(partial?: Partial<Task>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ length: 100 })
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  status: TaskStatus;
}

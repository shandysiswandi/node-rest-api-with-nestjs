import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import Base from './entity';

@Entity('users')
export class User extends Base {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  constructor(partial?: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}

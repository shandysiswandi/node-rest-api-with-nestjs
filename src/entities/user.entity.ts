import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import BaseEntity from 'src/entities/entity';

@Entity('users')
export class User extends BaseEntity {
  constructor(partial?: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;
}

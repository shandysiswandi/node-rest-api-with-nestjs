import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/app/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepo: UserRepository,
  ) {}
}

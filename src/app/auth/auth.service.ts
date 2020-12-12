import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { LoginPayload, RegisterPayload } from 'src/app/auth/auth.payload';
import { UserRepository } from 'src/app/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepo: UserRepository,
  ) {}

  async login(payload: LoginPayload): Promise<User> {
    return this.userRepo.login(payload);
  }

  async register(payload: RegisterPayload): Promise<User> {
    return this.userRepo.register(payload);
  }
}

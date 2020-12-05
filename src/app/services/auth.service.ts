import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from '../repositories/auth.repository';
import { RegisterDto } from '../dto/auth/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository) private authRepository: AuthRepository,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    return this.authRepository.register(registerDto);
  }
}

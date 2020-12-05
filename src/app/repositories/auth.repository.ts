import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { RegisterDto } from '../dto/auth/register.dto';
import { ErrorCodeTypeORM, ErrorMessageTypeORM } from '../types/error-typeorm';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async register(registerDto: RegisterDto): Promise<void> {
    const { name, username, email, password } = registerDto;

    const user = new User();
    user.name = name;
    user.username = username;
    user.email = email;
    user.password = password;

    try {
      await user.save();
    } catch (error) {
      console.log(error);

      if (error.code === ErrorCodeTypeORM.CONFLICT) {
        throw new ConflictException(
          error.detail || ErrorMessageTypeORM.CONFLICT,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

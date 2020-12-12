import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/entities';
import { hashBcrypt } from 'src/common';
import { ErrorCodeTypeORM, ErrorMessageTypeORM } from 'src/types';
import { RegisterPayload, LoginPayload } from 'src/app/auth';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async login(payload: LoginPayload): Promise<User> {
    const user = await this.findOne({
      where: [{ username: payload.login }, { email: payload.login }],
    });

    // const password = await compareBcrypt(loginDto.password);

    return user;
  }

  async register(registerDto: RegisterPayload): Promise<User> {
    const { name, username, email, password } = registerDto;

    const user = new User({
      name,
      username,
      email,
      password: await hashBcrypt(password),
    });

    try {
      return await user.save();
    } catch (error) {
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

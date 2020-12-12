import { EntityRepository, Repository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { ErrorCodeTypeORM, ErrorMessageTypeORM } from 'src/types/error-typeorm.enum';
import { RegisterPayload, LoginPayload } from 'src/app/auth/auth.payload';
import { hashBcrypt, compareBcrypt } from 'src/common';

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

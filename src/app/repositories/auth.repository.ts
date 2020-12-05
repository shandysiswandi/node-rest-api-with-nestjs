import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { RegisterDto } from '../dto/auth/register.dto';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async register(registerDto: RegisterDto): Promise<void> {
    const { name, username, email, password } = registerDto;

    const user = new User();
    user.name = name;
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();
  }
}

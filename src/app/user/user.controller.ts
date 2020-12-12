import { Controller } from '@nestjs/common';
import { UsersService } from 'src/app/user/user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
}

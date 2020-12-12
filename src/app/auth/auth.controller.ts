import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { User } from 'src/entities';
import { AuthService, LoginPayload, RegisterPayload } from 'src/app/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() payload: LoginPayload): Promise<User> {
    return this.authService.login(payload);
  }

  @Post('register')
  @HttpCode(201)
  register(@Body() payload: RegisterPayload): Promise<User> {
    return this.authService.register(payload);
  }
}

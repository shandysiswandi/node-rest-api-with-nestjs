import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/auth/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Auth register
   *
   * @Route POST /auth/register
   * @param registerDto RegisterDto
   * @Code 201
   * @return Task
   */
  @Post('register')
  createTask(@Body(ValidationPipe) registerDto: RegisterDto): Promise<void> {
    return this.authService.register(registerDto);
  }
}

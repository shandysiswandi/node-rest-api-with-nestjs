import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from '../repositories/auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

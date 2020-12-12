import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './modules/tasks.module';
import { AuthModule } from './modules/auth.module';
import { UsersModule } from './modules/users.module';
import typeOrmConfig from 'src/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => typeOrmConfig(config),
    }),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
  providers: [],
})
export class AppModule { }

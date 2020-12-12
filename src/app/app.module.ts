import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from 'src/app/task/task.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { UsersModule } from 'src/app/user/user.module';
import { typeOrmConfig } from 'src/config/typeorm.config';

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
export class AppModule {}

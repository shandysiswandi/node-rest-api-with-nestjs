import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from 'src/app/task';
import { AuthModule } from 'src/app/auth';
import { UsersModule } from 'src/app/user';
import { typeOrmConfig } from 'src/config';

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

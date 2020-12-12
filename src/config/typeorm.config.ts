import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (env: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: env.get<string>('DB_HOST'),
  port: env.get<number>('DB_PORT'),
  username: env.get<string>('DB_USER'),
  password: env.get<string>('DB_PASS'),
  database: env.get<string>('DB_NAME'),
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
  synchronize: env.get<string>('APP_ENV') === 'local',
  ssl: env.get<string>('APP_ENV') === 'production',
});

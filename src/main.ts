import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/app.module';
import { middlewares } from './misc/middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  middlewares(app);

  await app.listen(process.env.APP_PORT);
}

bootstrap();

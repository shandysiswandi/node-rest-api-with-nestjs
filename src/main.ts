import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as csurf from 'csurf';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // instance application
  const app = await NestFactory.create(AppModule);

  // middlewares
  app.enableCors();
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minute
      max: 60, // limit each IP to 60 requests per windowMs
    }),
  );
  app.use(csurf());

  // listen
  await app.listen(process.env.PORT);
}

bootstrap();

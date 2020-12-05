import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { middlewares, interceptors } from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Call list of middleware
   */
  middlewares(app);

  /**
   * Call list of interceptor
   */
  interceptors(app);

  await app.listen(process.env.APP_PORT, () => {
    if (process.env.APP_ENV === 'local') {
      console.log(`Running on http://localhost:${process.env.APP_PORT}`);
    }
  });
}

bootstrap();

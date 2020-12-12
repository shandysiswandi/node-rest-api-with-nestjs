import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';
import { interceptors } from 'src/common/interceptor';
import { validations } from 'src/common/validation';
import { middlewares } from 'src/common/middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Call list of global middleware
  middlewares(app);

  // Call list of global validation-pipe
  validations(app);

  // Call list of global interceptor
  interceptors(app);

  await app.listen(process.env.APP_PORT, () => {
    if (process.env.APP_ENV === 'local') {
      console.log(`Running on http://localhost:${process.env.APP_PORT}`);
    }
  });
}

bootstrap();

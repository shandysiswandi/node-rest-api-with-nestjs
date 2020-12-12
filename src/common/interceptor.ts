import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from 'src/app/interceptor/response.interceptor';

export function interceptors(app: INestApplication): void {
  app.useGlobalInterceptors(new ResponseInterceptor());
}

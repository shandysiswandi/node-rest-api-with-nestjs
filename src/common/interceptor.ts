import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from '../interceptors/response.interceptor';

export function interceptors(app: INestApplication): void {
  app.useGlobalInterceptors(new ResponseInterceptor());
}

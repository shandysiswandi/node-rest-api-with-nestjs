import { INestApplication } from '@nestjs/common';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';

export function interceptors(app: INestApplication): void {
  app.useGlobalInterceptors(new ResponseInterceptor());
}

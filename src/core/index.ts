import { INestApplication } from '@nestjs/common';
import { ResponseInterceptor } from 'src/core/interceptor/response.interceptor';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
// import * as csurf from 'csurf';

/**
 * Call interceptor to global
 *
 * @param app INestApplication
 * @returns void
 */
export function interceptors(app: INestApplication): void {
  app.useGlobalInterceptors(new ResponseInterceptor());
}

/**
 * Call middleware to global
 *
 * @param app INestApplication
 * @returns void
 */
export function middlewares(app: INestApplication): void {
  app.enableCors();
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minute
      max: 60, // limit each IP to 60 requests per windowMs
    }),
  );
  // app.use(csurf());
}

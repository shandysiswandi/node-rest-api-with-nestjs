import { INestApplication } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';

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

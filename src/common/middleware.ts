import { INestApplication } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';

export function middlewares(app: INestApplication): void {
  app.enableCors();
  app.use(helmet());
  app.use(rateLimitFunc());
  // app.use(csurf());
}

// For limit incomming request
// windowMs : number  => batas waktu limit request (miliseconds)
// max      : number  => limit each IP to 60 requests per windowMs
// message  : object  => custom response message
function rateLimitFunc() {
  return rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    message: {
      status: 429,
      message: 'You have reached the limit request.',
      error: 'Too many requests, please try again later.',
    },
  });
}

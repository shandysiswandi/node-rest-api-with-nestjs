import { INestApplication, ValidationPipe } from '@nestjs/common';

export function validations(app: INestApplication): void {
  app.useGlobalPipes(new ValidationPipe());
}

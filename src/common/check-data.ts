import { NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

// for checking fields entity
export function entityFields(data: any) {
  for (const [key, value] of Object.entries(data)) {
    if (!value) delete data[key];
  }
  return data;
}

// for check incomming argument ID is there in database `getOne`
export function isCanGetID(data: any, id: number | string): void {
  if (!data) throw new NotFoundException(`The given id '${id}' is not found`);
}

// for check incomming argument ID is there in database `delete`
export function isCanDelete(data: UpdateResult, id: string | number): void {
  if (data?.affected === 0)
    throw new NotFoundException(`The given id '${id}' is not found`);

  if (data?.raw?.affectedRows === 0)
    throw new NotFoundException(`The given id '${id}' is not found`);
}

import { PickType } from '@nestjs/mapped-types';
import { Sockets } from '../models/sockets.model';

export class SocketsCreateDto extends PickType(Sockets, [
  '_id',
  'id',
  'username',
] as const) {}

import { PickType } from '@nestjs/mapped-types';
import { Sockets } from '../models/sockets.model';

export class SocketsCreateDto extends PickType(Sockets, [
  'id',
  'username',
] as const) {}

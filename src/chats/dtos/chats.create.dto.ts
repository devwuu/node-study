import { PickType } from '@nestjs/mapped-types';
import { Chats } from '../models/chats.model';

export class ChatsCreateDto extends PickType(Chats, [
  'user',
  'chat',
] as const) {}

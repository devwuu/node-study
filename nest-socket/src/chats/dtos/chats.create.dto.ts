import { PickType } from '@nestjs/mapped-types';
import { Chats } from '../models/chats.model';

export class ChatsCreateDto {
  user: string;
  chat: string;
}

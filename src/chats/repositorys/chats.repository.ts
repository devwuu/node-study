import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Chats } from '../models/chats.model';
import { ChatsCreateDto } from '../dtos/chats.create.dto';
import { Model } from 'mongoose';

@Injectable()
export class ChatsRepository {
  constructor(@InjectModel(Chats.name) private readonly chats: Model<Chats>) {}

  async save(chat: ChatsCreateDto): Promise<null | ChatsCreateDto> {
    const saved = await this.chats.create(chat);
    return saved;
  }
}

import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Chats } from '../models/chats.model';
import { ChatsCreateDto } from '../dtos/chats.create.dto';
import { Model } from 'mongoose';
import { Sockets } from '../models/sockets.model';

@Injectable()
export class ChatsRepository {
  constructor(
    @InjectModel(Chats.name) private readonly chats: Model<Chats>,
    @InjectModel(Sockets.name) private readonly sockets: Model<Sockets>,
  ) {}

  async save(chat: ChatsCreateDto): Promise<null | ChatsCreateDto> {
    const find = await this.sockets.findOne({ id: chat.user });
    const saved = await this.chats.create({
      chat: chat.chat,
      user: find,
    });
    return { user: find.username, chat: saved.chat };
  }
}

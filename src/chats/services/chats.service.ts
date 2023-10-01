import { Injectable } from '@nestjs/common';
import { ChatsRepository } from '../repositorys/chats.repository';
import { ChatsCreateDto } from '../dtos/chats.create.dto';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async save(chat: ChatsCreateDto) {
    return await this.chatsRepository.save(chat);
  }
}

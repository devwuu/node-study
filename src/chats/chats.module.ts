import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './services/chats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sockets, SocketSchema } from './models/sockets.model';
import { Chats, ChatSchema } from './models/chats.model';
import { SocketsService } from './services/sockets.service';
import { SocketsRepository } from './repositorys/sockets.repository';
import { ChatsRepository } from './repositorys/chats.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sockets.name, schema: SocketSchema },
      { name: Chats.name, schema: ChatSchema },
    ]),
  ],
  providers: [
    ChatsGateway,
    ChatsService,
    SocketsService,
    SocketsRepository,
    ChatsRepository,
  ],
})
export class ChatsModule {}

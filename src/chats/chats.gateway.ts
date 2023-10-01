import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ChatsService } from './services/chats.service';
import { SocketsService } from './services/sockets.service';

@WebSocketGateway({ namespace: 'chatting' }) // namespace 를 옵션으로 설정해줄 수 있음
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger();

  constructor(
    private readonly chatsService: ChatsService,
    private readonly socketsService: SocketsService,
  ) {}

  // client에서 발생 시킨 event를 catch 한다 ('on'이라고 생각하면 됨) ==> socket.on('new_user', ...)
  // client에서 emit 시킨 event 이름과 SubscribeMessage의 인자를 일치 시켜준다
  @SubscribeMessage('new_user')
  async findNewUser(
    @MessageBody() username: string, // client에서 보낸 메세지.
    @ConnectedSocket() socket: Socket, // 연결된 소켓. 연결이 끊기기 전까지는 동일한 id로 연결이 유지된다. 그래서 연결된 user를 식별할 수 있다
  ): Promise<string> {
    // 연결된 모든 소켓들에게 broadcating
    socket.broadcast.emit('user_connected', username);
    const saved = await this.socketsService.save({
      id: socket.id,
      username,
    });

    return saved.username; // client에서 new_user를 emit 시킨 함수의 callback 함수로 받을 수 있다
  }

  @SubscribeMessage('submit_chat')
  async handleSubmitChat(
    @MessageBody() chat,
    @ConnectedSocket() socket: Socket,
  ) {
    const saved = await this.chatsService.save({ chat, user: socket.id });
    socket.broadcast.emit('new_chat', {
      username: saved.user,
      chat: saved.chat,
    });
  }

  // gateway life cycle
  // OnGatewayInit 인터페이스 구현
  afterInit(server: any): any {
    this.logger.log('after init...');
  }

  //OnGatewayConnection 인터페이스 구현
  handleConnection(@ConnectedSocket() socket: Socket): void {
    this.logger.log(`connected...${socket.id} ${socket.nsp.name}`); // client와 연결이 된 이후에 실행됨.
  }

  //OnGatewayDisconnect 인터페이스 구현
  async handleDisconnect(@ConnectedSocket() socket: Socket): Promise<void> {
    const username = await this.socketsService.delete(socket.id);
    // 몽고디비는 왜래키 위반을 strict 하게 잡지 않기 때문에 유저만 날려도 괜찮다
    socket.broadcast.emit('user_disconnected', username);
    this.logger.log(`disconnected...${username}`); // client와 연결이 끊어진 이후에 실행됨.
  }
}

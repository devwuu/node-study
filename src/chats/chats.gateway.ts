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

@WebSocketGateway({ namespace: 'chatting' }) // namespace 를 옵션으로 설정해줄 수 있음
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger();

  // client에서 발생 시킨 event를 catch 한다 ('on'이라고 생각하면 됨) ==> socket.on('new_user', ...)
  // client에서 emit 시킨 event 이름과 SubscribeMessage의 인자를 일치 시켜준다
  @SubscribeMessage('new_user')
  findNewUser(
    @MessageBody() username: string, // client에서 보낸 메세지.
    @ConnectedSocket() socket, // 연결된 소켓. 연결이 끊기기 전까지는 동일한 id로 연결이 유지된다. 그래서 연결된 user를 식별할 수 있다
  ): string {
    console.log(`username is... ${username}`);
    console.log(`socket id is... ${socket.id}`);
    socket.emit('hello_user', `hello, ${username}`); // client로 데이터 전송
    return 'hello anonymous user'; // client에서 new_user를 emit 시킨 함수의 callback 함수로 받을 수 있다
  }

  // gateway life cycle
  constructor() {
    this.logger.log('constructor...');
  }

  // OnGatewayInit 인터페이스 구현
  afterInit(server: any): any {
    this.logger.log('after init...');
  }

  //OnGatewayConnection 인터페이스 구현
  handleConnection(@ConnectedSocket() socket): any {
    this.logger.log(`connected...${socket.id} ${socket.nsp.name}`); // client와 연결이 된 이후에 실행됨.
  }

  //OnGatewayDisconnect 인터페이스 구현
  handleDisconnect(@ConnectedSocket() socket): any {
    this.logger.log(`disconnected...${socket.id} ${socket.nsp.name}`); // client와 연결이 끊어진 이후에 실행됨.
  }
}

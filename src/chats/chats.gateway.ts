import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ChatsGateway {
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
}

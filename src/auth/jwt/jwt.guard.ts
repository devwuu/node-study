import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // AuthGuard --> strategy 를 자동으로 실행해줌
  //jwt type이기 때문에 jwt strategy를 찾아 실행시켜준다
}

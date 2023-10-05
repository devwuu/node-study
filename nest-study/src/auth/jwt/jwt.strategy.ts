import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'process';
import { Payload } from './jwt.payload';
import { CatsRepository } from '../../cats/cats.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // jwt strategy를 상속받았기 때문에 guard에서 stratedgy를 찾아올 수 있다.
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer 헤더 사용
      secretOrKey: process.env.SECRET_KEY, // jwt validate 시 사용하는 키
      ignoreExpiration: false, // 만료시간 존재
    });
  }

  // guard -> strategy -> validate 실행
  async validate(payload: Payload) {
    console.log('aaaa');
    const find = await this.catsRepository.findByIdWithoutPassword(payload.sub);
    if (!find) throw new UnauthorizedException('unauthorized');
    return find; // validate 에서 return 해준 값이 request.user에 들어가게 된다
  }
}

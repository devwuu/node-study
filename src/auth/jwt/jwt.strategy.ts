import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'process';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer 헤더 사용
      secretOrKey: process.env.SECRET_KEY, // jwt validate 시 사용하는 키
      ignoreExpiration: false, // 만료시간 존재
    });
  }

  // guard -> strategy -> validate 실행
  // async validate(payload) {
  //
  // }
}

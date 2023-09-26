import { HttpException, Injectable } from '@nestjs/common';
import { CatsRepository } from '../cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginRequestDto) {
    const { email, password } = data;

    const cat = await this.catsRepository.findByEmail(email);
    if (cat === null) throw new HttpException('Not Exist Cat', 403);

    // 첫번째 인자: 평문, 두번째 인자: 암호화
    const isPasswordValidate: boolean = await bcrypt.compare(
      password,
      cat.password,
    );
    if (!isPasswordValidate) throw new HttpException('Not Exist Cat', 403);

    const payload = {
      email,
      sub: cat.id, // 토큰 제목(subject? )
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}

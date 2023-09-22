import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// 각 도메인 별로 모듈을 만들고 그 모듈에 별도로 컨트롤러와 서비스 등을 등록한다
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [], // 여기서 exports 를 해줘야 다른 모듈에서 cats 모듈에 있는 service 등을 사용할 수 있다
})
export class CatsModule {}

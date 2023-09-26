import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Cat, CatSchema } from "./cats.schema";

// 각 도메인 별로 모듈을 만들고 그 모듈에 별도로 컨트롤러와 서비스 등을 등록한다
@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Cat.name, schema: CatSchema}
    ])
  ],
  controllers: [CatsController],
  providers: [CatsService], // DI 할 모듈. 여기에 등록 해야 DI 받을 수 있다. (내 모듈에 있는 Provider를 적는 것임)
  // 자기 모듈이 아닌 곳에 있는 service는 Provider에 바로 때려박는 게 아님
  // 내 프로바이더에는 내 프로바이더만 작성한다. (단일 책임의 원칙)
  exports: [CatsService], // 여기서 exports 를 해줘야 다른 모듈에서 cats 모듈에 있는 service 등을 사용할 수 있다화
  // export에 등록되어 있지 않은 프로바이더들은 다 캡슐화가 되어 있기 때문에 다른 모듈에서 접근할 수 없다.
})
export class CatsModule {}

import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class CatsRequestDto extends PickType(Cat, [
  'email',
  'password',
  'name',
  'imgUrl',
] as const) {
  // 데코레이터 적용이 가능하고(validation 가능)
  // 클래스가 확장성에 있어서 더 유리하기 때문에 DTO를 사용
}

// pick 타입을 사용하면 이미 정의된 객체에서 필드만 가져와서 사용할 수 있다
// 스키마와 직접적인 상속관계가 아니기 때문에 document와도 관계가 없다
// 단순히 필드만 빌려와서 꽂는 것
// 근데 이렇게 하면 필드에 달린 데코레이터도 공유하는 거 같은데 그래도 되나????

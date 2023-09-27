import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class CatResponseDto extends PickType(Cat, [
  'email',
  'name',
  'imgUrl',
] as const) {
  @ApiProperty({
    example: '6512371ed3be408d6856d64b',
    description: 'id',
    required: true,
  })
  id: string;
}

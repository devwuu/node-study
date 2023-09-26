import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import { CatResponseDto } from './dto/cat.response.dto';
import { CatsRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email });
      return result !== null;
    } catch (error) {
      // 기본적으로 스키마에서 validation이 일어나서 에러처리가 되게 되어있지만
      // 이런 식으로 repository에서 에러처리를 할 수도 있다.
      throw new HttpException('db error', 500);
    }
  }

  async create(cat: CatsRequestDto): Promise<CatResponseDto> {
    const saved = await this.catModel.create(cat);
    return saved.readonlyData;
    // 객체 필드 구조가 동일하기 때문에 꼭 타입이 정확하게 일치하지 않아도 됨. 타입스크립트에서 추론해서 맞는 걸로 봄
  }
}

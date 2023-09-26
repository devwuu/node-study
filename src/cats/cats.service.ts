import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CatsRequestDto } from "./dto/cats.request.dto";
import { Model } from "mongoose";
import { Cat } from "./cats.schema";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';

@Injectable() // provider 에 붙는 데코레이터
export class CatsService {
  
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}
  // Cat.name은 Cat 클래스의 name 필드를 가리키는 게 아니고 class의 이름을 가져오는 것임
  // Cat은 인스턴스가 아니기 때문에 타입스크립트는 클래스와 인스턴스를 구분해서 값을 가져온다.
  
  async signUp(cat: CatsRequestDto) {
    const { email, name, password } = cat;
    const isExist = await this.catModel.exists({ email });
    //    const isExist = await this.catModel.exists({ email: email }); 을 줄인 것임
    if (isExist) throw new UnauthorizedException('cat already exist');
    const hashed = await bcrypt.hash(password, 10);
    const saved = await this.catModel.create({
      email,
      name,
      password: hashed,
    });
    return saved.readonlyData;
  }
}

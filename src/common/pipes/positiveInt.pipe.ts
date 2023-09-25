import { HttpException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PositiveIntPipe implements PipeTransform{
  transform(value: number): any {
    console.log('PositiveIntPipe');
    if (value < 0) throw new HttpException('value < 0', 401);
    // 사용자 정의 파이프를 사용해서 새로운 validation을 추가할 수도 있다
    return value;
  }
}
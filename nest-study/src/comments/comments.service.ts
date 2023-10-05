import { HttpException, Injectable } from '@nestjs/common';
import { CommentsCreateDto } from './dto/comments.create.dto';
import { CommentsRepository } from './comments.repository';
import { CatsRepository } from '../cats/cats.repository';
import { Comment } from './comments.schema';

import mongoose, { Types } from 'mongoose';
import { CommentsResponseDto } from './dto/comments.response.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly catsRepository: CatsRepository,
  ) {}

  async findAll(): Promise<CommentsResponseDto[] | null> {
    return await this.commentsRepository.findAll();
  }

  // 데이터 타입 고민해보기...
  // cat id 타입이 어디는 tpye.objectId고 어디는 string이라 통일성이 없음
  async save(cat, comment: CommentsCreateDto) {
    const author = await this.catsRepository.findByIdWithoutPassword(cat.id);
    const { info, contents } = comment;
    const target = await this.catsRepository.findByIdWithoutPassword(info);
    // 몽고디비는 일반적으로 참조키가 위배돼도 에러가 발생하지 않고 데이터는 들어가기 때문에 검증을 꼭 해줘야 한다
    if (!author || !target) throw new HttpException('Not Exist Cat', 403);
    // author의 변조 가능성이 있기 때문에 굳이 DB에서 찾은 author를 사용하는 것이기도 함
    const saved = await this.commentsRepository.save(author, {
      info: new Types.ObjectId(target.id),
      contents,
    });
    return saved;
  }

  async plusLike(id: string) {
    return await this.commentsRepository.plusLike(id);
  }
}

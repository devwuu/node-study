import { HttpException, Injectable } from '@nestjs/common';
import { CommentsCreateDto } from './dto/comments.create.dto';
import { CommentsRepository } from './comments.repository';
import { CatsRepository } from '../cats/cats.repository';
import mongoose from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly catsRepository: CatsRepository,
  ) {}

  async findAll() {}

  // 데이터 타입 고민해보기...
  // cat id 타입이 어디는 tpye.objectId고 어디는 string이라 통일성이 없음
  async save(cat, comment: CommentsCreateDto) {
    const author = await this.catsRepository.findByIdWithoutPassword(cat.id);
    const { info, contents } = comment;
    const target = await this.catsRepository.findByIdWithoutPassword(info);
    if (!author || !info) throw new HttpException('Not Exist Cat', 403);
    const saved = await this.commentsRepository.save(author, {
      info: target.id,
      contents,
    });
    return saved;
  }

  async plusLike(id: string) {}
}

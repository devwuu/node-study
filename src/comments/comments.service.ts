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

  async save(cat, comment: CommentsCreateDto) {
    const author = await this.catsRepository.findByIdWithoutPassword(cat.id);
    const { info, contents } = comment;
    const target = await this.catsRepository.findByIdWithoutPassword(info);
    if (!author || !info) throw new HttpException('Not Exist Cat', 403);
    const saved = await this.commentsRepository.save(author, {
      info: new mongoose.Types.ObjectId(target.id),
      contents,
    });
    return saved;
  }

  async plusLike(id: string) {}
}

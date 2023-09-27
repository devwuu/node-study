import { Injectable } from '@nestjs/common';
import { Comment } from './comments.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CommentsCreateDto } from './dto/comments.create.dto';
import { CatsRequestDto } from '../cats/dto/cats.request.dto';
import { CatResponseDto } from '../cats/dto/cat.response.dto';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  save(
    author: CatResponseDto,
    comment: CommentsCreateDto,
  ): Promise<CommentsCreateDto | null> {
    const { info, contents } = comment;
    const newComment = {
      author: author.id,
      info,
      contents,
    };

    const saved = this.commentModel.create(newComment);
    return saved;
  }
}

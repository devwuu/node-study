import { HttpException, Injectable } from '@nestjs/common';
import { Comment } from './comments.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CommentsCreateDto } from './dto/comments.create.dto';
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

  async findAll(): Promise<Comment[] | null> {
    const all = await this.commentModel.find();
    return all;
  }

  async plusLike(id: string) {
    const comment = await this.commentModel.findById(id);
    if (!comment) throw new HttpException('Not Exist Comment', 400);
    comment.likeCount += 1;
    const saved = await comment.save();
    return saved.readonlyData;
  }
}

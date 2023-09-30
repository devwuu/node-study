import { PickType } from '@nestjs/swagger';
import { Comment } from '../comments.schema';

export class CommentsResponseDto extends PickType(Comment, [
  'id',
  'info',
  'contents',
  'author',
  'likeCount',
] as const) {}

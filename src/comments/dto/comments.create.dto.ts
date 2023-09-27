import { PickType } from '@nestjs/swagger';
import { Comment } from '../comments.schema';

// DTO 별 용도를 확실하게 구분해주는 게 좋다
export class CommentsCreateDto extends PickType(Comment, [
  'info',
  'contents',
] as const) {}

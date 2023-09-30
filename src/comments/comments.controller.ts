import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/user.decorator';
import { CommentsCreateDto } from './dto/comments.create.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @ApiOperation({
    summary: '모든 댓글 가져오기',
  })
  @Get('all')
  async findAll() {
    return this.commentService.findAll();
  }

  @ApiOperation({
    summary: '특정 고양이 프로필에 댓글 남기기',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async save(@CurrentUser() cat, @Body() comment: CommentsCreateDto) {
    return this.commentService.save(cat, comment);
  }

  @ApiOperation({
    summary: '좋아요 수 올리기',
  })
  @Post('like/:id')
  async plusLike(@Param('id') id: string) {
    return await this.commentService.plusLike(id);
  }
}

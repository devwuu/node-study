import { Document, Model, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
  timestamps: true,
  collection: 'comments',
};

@Schema(options)
export class Comment extends Document {
  @ApiProperty({
    required: true,
    description: '작성한 고양이 id',
  })
  @IsString()
  @IsNotEmpty()
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  author: Types.ObjectId;
  // 몽고디비에서 타입은 Types.ObjectId 이지만 핸들링하기 편하게 string 으로 파싱해준다
  // id는 몽고디비에서 무결성을 지키기 위해 Types.ObjectId 으로 자동으로 관리해주는 id

  @ApiProperty({
    description: '작성 대상',
  })
  @Prop({
    required: true,
    ref: 'cats',
    type: Types.ObjectId,
  })
  @IsNotEmpty()
  @IsString()
  info: Types.ObjectId;

  @ApiProperty({
    required: true,
    description: '댓글 내용',
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({
    description: '좋아요',
  })
  @Prop({
    default: 0,
  })
  @IsPositive()
  likeCount: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.virtual('readonlyData').get(function (this: Comment) {
  return {
    author: this.author.toString(),
    info: this.info.toString(),
    contents: this.contents,
    likeCount: this.likeCount,
  };
});

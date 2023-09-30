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
  author: string;
  // 몽고디비에서 타입은 Types.ObjectId 이지만 핸들링하기 편하게 string 으로 파싱해준다
  // id는 몽고디비에서 무결성을 지키기 위해 Types.ObjectId 으로 자동으로 관리해주는 id
  /**
   * 보여줄 때만 stirng 으로 파싱해서 보여주는거지 데이터 검색하거나 저장할 때는 타입이 다르게 저장된다
   * 따라서 string이면 string, Types.ObjectId면 id 이렇게 통일해서 데이터 타입을 관리해줘야 한다
   * string으로 저장하고 Types.ObjectId로 검색하려고 하면 검색이 안됨
   * (populate, findById 메서드를 쓸 때 예상하지 않은 오류가 발생할 수 있음.)
   * */

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

  readonly readonlyData: {
    id: string;
    author: string;
    info: string;
    contents: string;
    likeCount: number;
  };
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.virtual('readonlyData').get(function (this: Comment) {
  return {
    id: this.id,
    author: this.author.toString(),
    info: this.info.toString(),
    contents: this.contents,
    likeCount: this.likeCount,
  };
});

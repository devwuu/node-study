import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

const options: SchemaOptions = {
  timestamps: true, // updated_at, created_at 를 만들어준다
};

@Schema(options)
export class Cat extends Document {

  @Prop({
    required: true,
    unique: true,
  }) // 테이블 컬럼 정의
  @IsEmail() // 클래스 validation
  @IsNotEmpty() // 클래스 validation
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

} // cat schema 정의

export const CatSchema = SchemaFactory.createForClass(Cat); // 정의한 schema를 실제 스키마로 만든다

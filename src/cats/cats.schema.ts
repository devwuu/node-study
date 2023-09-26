import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

const options: SchemaOptions = {
  timestamps: true, // updated_at, created_at 를 만들어준다
};

@Schema(options)
export class Cat extends Document {

  @ApiProperty({
    example: 'test1@gmail.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  }) // 테이블 컬럼 정의
  @IsEmail() // 클래스 validation
  @IsNotEmpty() // 클래스 validation
  email: string;

  @ApiProperty({
    example: 'sam',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  // 실제 db에 존재하는 컬럼은 아닌 가상 필드
  // virtual 함수로 만든다
  readonly readonlyData: {
    id: string;
    email: string;
    name: string;
  };

} // cat schema 정의

export const CatSchema = SchemaFactory.createForClass(Cat); // 정의한 schema를 실제 스키마로 만든다

// 필드에 정의해둔 필드 name이랑 일치 시켜준다
CatSchema.virtual('readonlyData').get(function (this: Cat){
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  }; // password 가 외부에 노출되지 않기 위해 password를 제외한 virtual field를 만들어준다
  // Document를 가리키는 this를 사용해야 하기 때문에 화살표 함수를 쓸 수 없음
});
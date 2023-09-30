import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
  timestamps: true, // updated_at, created_at 를 만들어준다
  collection: 'cats', // collection 이름. 정해주지 않으면 class(lower case) + s 로 자동 생성된다
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
  email: string; // DB 필드 이름은 기본적으로 클래스와 정의된 것과 동일하게 지어준다
  // 필드 타입은 기본적으로 클래스에 정의된 타입을 따라가지만 배열이나 참조 객체 같이 특수한 경우에는 타입을 적어줘야 한다

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

  @Prop({
    default:
      'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg', // 기본이미지
  })
  @IsString()
  @IsOptional()
  imgUrl?: string;

  // 실제 db에 존재하는 컬럼은 아닌 가상 필드
  // virtual 함수로 만든다
  readonly readonlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };
} // cat schema 정의

const _CatSchema = SchemaFactory.createForClass(Cat); // 정의한 schema를 실제 스키마로 만든다

// 클래스 필드에 정의해둔 클래스 필드 name이랑 일치 시켜준다
_CatSchema.virtual('readonlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  }; // password 가 외부에 노출되지 않기 위해 password를 제외한 virtual field를 만들어준다
  // Document를 가리키는 this를 사용해야 하기 때문에 화살표 함수를 쓸 수 없음
});

// comment와 데이터 조인을 위해 사용
_CatSchema.virtual('comments', {
  // 가상 필드로 만들 이름을 정해준다
  ref: 'comments', // 스키마 이름
  localField: '_id',
  foreignField: 'info', // 외래 | 참조 필드
});
_CatSchema.set('toObject', { virtuals: true }); // populate를 사용하기 위한 옵션
_CatSchema.set('toJSON', { virtuals: true }); // populate를 사용하기 위한 옵션

export const CatSchema = _CatSchema;

import { Document, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

const options: SchemaOptions = {
  id: false,
  // _id를 사용하지 않겠다. 근데 datadog으로 열어보니까 _id는 들어감. 이 model에서 사용하지 않겠다는 뜻인가???
  // chats 에서 참조도 잘 된다
  timestamps: true,
  collection: 'sockets',
};

@Schema(options)
export class Sockets extends Document {
  @Prop({
    unique: true,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  readonly readOnlyData: {
    id: string;
    username: string;
  };
}

export const SocketSchema = SchemaFactory.createForClass(Sockets);
SocketSchema.virtual('readOnlyData').get(function (this) {
  return {
    id: this.id,
    username: this.username,
  };
});

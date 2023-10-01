import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Sockets } from './sockets.model';

const options: SchemaOptions = {
  collection: 'chats',
  timestamps: true,
};

@Schema(options)
export class Chats extends Document {
  @Prop({
    // 타입을 하나 하나 정의해준다고 보면 됨
    type: {
      _id: { type: Types.ObjectId, required: true, ref: 'sockets' },
      id: { type: String }, // socket.id
      username: { type: String, required: true }, // socket.username
    },
  })
  @IsNotEmpty()
  @IsString()
  user: Sockets;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  chat: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chats);

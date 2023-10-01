import { Document, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

const options: SchemaOptions = {
  id: false,
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
    id: Types.ObjectId;
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

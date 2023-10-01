import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sockets } from '../models/sockets.model';
import { Model } from 'mongoose';
import { SocketsCreateDto } from '../dtos/sockets.create.dto';
import * as crypto from 'crypto';

@Injectable()
export class SocketsRepository {
  constructor(
    @InjectModel(Sockets.name) private readonly sockets: Model<Sockets>,
  ) {}

  async save(socket: SocketsCreateDto) {
    let { username, id } = socket;
    const find = await this.sockets.exists({ username });
    if (find) username += `_${crypto.randomUUID()}`;
    const saved = await this.sockets.create({ id, username });
    return saved.readOnlyData;
  }

  async delete(socketId: string) {
    const socket = await this.sockets.findOne({ id: socketId });
    if (socket) {
      await this.sockets.deleteOne({ id: socketId });
      return socket.username;
    }
  }
}

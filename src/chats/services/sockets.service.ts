import { Injectable } from '@nestjs/common';
import { SocketsRepository } from '../repositorys/sockets.repository';
import { SocketsCreateDto } from '../dtos/sockets.create.dto';

@Injectable()
export class SocketsService {
  constructor(private readonly socketsRepository: SocketsRepository) {}

  async save(socket: SocketsCreateDto) {
    return await this.socketsRepository.save(socket);
  }

  async delete(socketId: string) {
    return await this.socketsRepository.delete(socketId);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDTO } from './user.dto';
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  prisma = new PrismaClient();

  async getUser(loginDto: UserDTO) {
    const query = await this.prisma.user.findFirst({
      where: {
        name: loginDto.name,
      },
    });
    return query;
  }
}

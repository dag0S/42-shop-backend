import { Injectable } from "@nestjs/common";
import { hash } from "argon2";

import type { AuthDto } from "src/auth/dto/auth.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        stores: true,
        favorites: true,
        orders: true
      }
    });

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: {
        stores: true,
        favorites: true,
        orders: true
      }
    });

    return user;
  }

  async create(dto: AuthDto) {
    return this.prismaService.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password)
      }
    });
  }
}

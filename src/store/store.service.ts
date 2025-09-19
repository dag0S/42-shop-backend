import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";

@Injectable()
export class StoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(userId: string, storeId: string) {
    const store = await this.prismaService.store.findUnique({
      where: {
        id: storeId,
        userId
      }
    });

    if (!store) {
      throw new NotFoundException(
        "Магазин не найден или вы не являетесь его владельцем"
      );
    }

    return store;
  }

  async create(dto: CreateStoreDto, userId: string) {
    return await this.prismaService.store.create({
      data: {
        title: dto.title,
        userId
      }
    });
  }

  async update(dto: UpdateStoreDto, userId: string, storeId: string) {
    await this.getById(userId, storeId);

    return await this.prismaService.store.update({
      where: {
        id: storeId
      },
      data: {
        ...dto
      }
    });
  }

  async delete(userId: string, storeId: string) {
    await this.getById(userId, storeId);

    return await this.prismaService.store.delete({
      where: {
        id: storeId
      }
    });
  }
}

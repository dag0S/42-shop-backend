import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { CategoryDto } from "./dto/category.dto";

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getByStoreId(storeId: string) {
    return await this.prismaService.category.findMany({
      where: {
        storeId
      }
    });
  }

  async getById(id: string) {
    const category = await this.prismaService.category.findUnique({
      where: {
        id
      }
    });

    if (!category) {
      throw new NotFoundException("Категория не найдена");
    }

    return category;
  }

  async create(dto: CategoryDto, storeId: string) {
    return await this.prismaService.category.create({
      data: {
        ...dto,
        storeId
      }
    });
  }

  async update(dto: CategoryDto, id: string) {
    await this.getById(id);

    return await this.prismaService.category.update({
      where: {
        id
      },
      data: dto
    });
  }

  async delete(id: string) {
    await this.getById(id);

    return await this.prismaService.category.delete({
      where: {
        id
      }
    });
  }
}

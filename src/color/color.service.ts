import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { ColorDto } from "./dto/color.dto";

@Injectable()
export class ColorService {
  constructor(private readonly prismaService: PrismaService) {}

  async getByStoreId(storeId: string) {
    return await this.prismaService.color.findMany({
      where: {
        storeId
      }
    });
  }

  async getById(id: string) {
    const color = await this.prismaService.color.findUnique({
      where: {
        id
      }
    });

    if (!color) {
      throw new NotFoundException("Цвет не найден");
    }

    return color;
  }

  async create(dto: ColorDto, storeId: string) {
    return await this.prismaService.color.create({
      data: {
        ...dto,
        storeId
      }
    });
  }

  async update(dto: ColorDto, id: string) {
    await this.getById(id);

    return await this.prismaService.color.update({
      where: {
        id
      },
      data: dto
    });
  }

  async delete(id: string) {
    await this.getById(id);

    return await this.prismaService.color.delete({
      where: {
        id
      }
    });
  }
}

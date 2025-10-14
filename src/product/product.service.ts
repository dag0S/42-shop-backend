import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { ProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(searchBy?: string) {
    if (searchBy) {
      return this.getSearchFilter(searchBy);
    }

    return await this.prismaService.product.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        category: true
      }
    });
  }

  private async getSearchFilter(searchBy: string) {
    return await this.prismaService.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchBy,
              mode: "insensitive"
            }
          },
          {
            description: {
              contains: searchBy,
              mode: "insensitive"
            }
          }
        ]
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        category: true
      }
    });
  }

  async getByStoreId(storeId: string) {
    return await this.prismaService.product.findMany({
      where: {
        storeId
      },
      include: {
        category: true,
        color: true
      }
    });
  }

  async getById(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id
      },
      include: {
        category: true,
        color: true,
        reviews: {
          include: {
            user: true
          }
        }
      }
    });

    if (!product) {
      throw new NotFoundException("Товар не найден");
    }

    return product;
  }

  async getByCategory(categoryId: string) {
    return await this.prismaService.product.findMany({
      where: {
        categoryId
      },
      include: {
        category: true
      }
    });
  }

  async getMostPopular() {
    const mostPopularProducts = await this.prismaService.orderItem.groupBy({
      by: ["productId"],
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: "desc"
        }
      }
    });

    const productIds = mostPopularProducts
      .map((item) => item.productId)
      .filter((id) => id !== null);

    const products = await this.prismaService.product.findMany({
      where: {
        id: {
          in: productIds
        }
      },
      include: {
        category: true
      }
    });

    return products;
  }

  async getSimilar(id: string) {
    const currentProduct = await this.getById(id);

    if (!currentProduct) {
      throw new NotFoundException("Текущий товар не найден");
    }

    const products = await this.prismaService.product.findMany({
      where: {
        categoryId: currentProduct.categoryId,
        NOT: {
          id: currentProduct.id
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        category: true
      }
    });

    return products;
  }

  async create(dto: ProductDto, storeId: string) {
    return await this.prismaService.product.create({
      data: {
        ...dto,
        storeId
      }
    });
  }

  async update(dto: ProductDto, id: string) {
    await this.getById(id);

    return await this.prismaService.product.update({
      where: {
        id
      },
      data: dto
    });
  }

  async delete(id: string) {
    await this.getById(id);

    return await this.prismaService.product.delete({
      where: {
        id
      }
    });
  }
}

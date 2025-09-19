import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query
} from "@nestjs/common";

import { ProductService } from "./product.service";
import { JwtAuth } from "src/auth/decorators/jwt-auth.decorator";
import { ProductDto } from "./dto/product.dto";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll(@Query("searchBy") searchBy?: string) {
    return this.productService.getAll(searchBy);
  }

  @Get("by-storeId/:storeId")
  @JwtAuth()
  getByStoreId(@Param("storeId") storeId: string) {
    return this.productService.getByStoreId(storeId);
  }

  @Get("by-id/:id")
  getById(@Param("id") id: string) {
    return this.productService.getById(id);
  }

  @Get("by-categoryId/:categoryId")
  getByCategoryId(@Param("categoryId") categoryId: string) {
    return this.productService.getByCategory(categoryId);
  }

  @Get("most-popular")
  getMostPopular() {
    return this.productService.getMostPopular();
  }

  @Get("similar/:id")
  getSimilar(@Param("id") id: string) {
    return this.productService.getSimilar(id);
  }

  @Post(":storeId")
  @HttpCode(HttpStatus.CREATED)
  @JwtAuth()
  create(@Body() dto: ProductDto, @Param("storeId") storeId: string) {
    return this.productService.create(dto, storeId);
  }

  @Put(":productId")
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  update(@Param("productId") productId: string, @Body() dto: ProductDto) {
    return this.productService.update(dto, productId);
  }

  @Delete(":productId")
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  delete(@Param("productId") productId: string) {
    return this.productService.delete(productId);
  }
}

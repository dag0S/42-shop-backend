import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put
} from "@nestjs/common";

import { JwtAuth } from "src/auth/decorators/jwt-auth.decorator";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./dto/category.dto";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("get-all/:storeId")
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  getByStoreId(@Param("storeId") storeId: string) {
    return this.categoryService.getByStoreId(storeId);
  }

  @Get(":categoryId")
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  getById(@Param("categoryId") categoryId: string) {
    return this.categoryService.getById(categoryId);
  }

  @Post(":storeId")
  @HttpCode(HttpStatus.CREATED)
  @JwtAuth()
  create(@Body() dto: CategoryDto, @Param("storeId") storeId: string) {
    return this.categoryService.create(dto, storeId);
  }

  @Put(":categoryId")
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  update(@Param("categoryId") categoryId: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(dto, categoryId);
  }

  @Delete(":categoryId")
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  delete(@Param("categoryId") categoryId: string) {
    return this.categoryService.delete(categoryId);
  }
}

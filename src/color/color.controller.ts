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

import { ColorService } from "./color.service";
import { JwtAuth } from "src/auth/decorators/jwt-auth.decorator";
import { ColorDto } from "./dto/color.dto";

@Controller("colors")
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get("get-all/:storeId")
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  getByStoreId(@Param("storeId") storeId: string) {
    return this.colorService.getByStoreId(storeId);
  }

  @Get(":colorId")
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  getById(@Param("colorId") colorId: string) {
    return this.colorService.getById(colorId);
  }

  @Post(":storeId")
  @HttpCode(HttpStatus.CREATED)
  @JwtAuth()
  create(@Body() dto: ColorDto, @Param("storeId") storeId: string) {
    return this.colorService.create(dto, storeId);
  }

  @Put(":colorId")
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  update(@Param("colorId") colorId: string, @Body() dto: ColorDto) {
    return this.colorService.update(dto, colorId);
  }

  @Delete(":colorId")
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  delete(@Param("colorId") colorId: string) {
    return this.colorService.delete(colorId);
  }
}

import { EnumOrderStatus } from "@prisma/client";
import { Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";

export class OrderDto {
  @IsOptional()
  @IsEnum(EnumOrderStatus, {
    message: `Статус заказа должен быть одним из: ${Object.values(EnumOrderStatus).join(", ")}.`
  })
  status: EnumOrderStatus;

  @IsArray({
    message: "В заказе нет ни одного товара"
  })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class OrderItemDto {
  @IsNumber({}, { message: "Количество должно быть строкой" })
  quantity: number;

  @IsNumber({}, { message: "Количество должно быть строкой" })
  price: number;

  @IsString({ message: "ID продукта должно быть строкой" })
  productId: string;

  @IsString({ message: "ID магазина должно быть строкой" })
  storeId: string;
}

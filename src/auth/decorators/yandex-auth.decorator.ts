import { applyDecorators, UseGuards } from "@nestjs/common";

import { YandexAuthGuard } from "../guards/yandex-auth.guard";

export function YandexAuth() {
  return applyDecorators(UseGuards(YandexAuthGuard));
}

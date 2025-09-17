import { AuthGuard } from "@nestjs/passport";

export class YandexAuthGuard extends AuthGuard("yandex") {}

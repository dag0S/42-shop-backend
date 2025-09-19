import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import type { User } from "@prisma/client";

import type { RequestWithUser } from "src/common/interfaces/request-with-user.interface";

export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    return data ? user?.[data] : user;
  }
);

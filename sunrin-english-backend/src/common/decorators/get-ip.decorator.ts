import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetIp = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.ip;
});

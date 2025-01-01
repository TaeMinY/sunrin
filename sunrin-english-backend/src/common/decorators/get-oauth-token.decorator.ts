import {
  ConsoleLogger,
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const GetOAuthToken = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!req.headers['authorization']) {
      throw new UnauthorizedException(
        '토큰이 존재하지 않습니다.',
        'USER_FAILURE_NULL_OAUTHTOKEN',
      );
    }

    const token = req.headers['authorization'].split('Bearer ')[1];

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(decoded);
      return decoded;
    } catch (e) {
      console.log(e.message);
      if (e.message === 'jwt expired') {
        throw new UnauthorizedException(
          '토큰 기간 만료',
          'USER_FAILURE_EXPIRED_OAUTHTOKEN',
        );
      }
      if (e.message === 'invalid token') {
        throw new UnauthorizedException(
          '유효하지 않은 토큰',
          'USER_FAILURE_INVALID_OAUTHTOKEN',
        );
      }
      throw e;
    }
  },
);

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import * as compression from 'compression';
import helmet from 'helmet';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';

import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/intercepts/response.intercept';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // CORS Setting
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], // 허용되는 헤더
  });

  // Swagger Docs

  // Helmet
  app.use(helmet());

  // Compression
  app.use(compression());

  // ThrottlerGuard

  // class 직렬화
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );

  // Response Interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
}
bootstrap();

import { ThrottlerModule } from '@nestjs/throttler';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ExceptionModule } from './exception/exception.module';
import { typeORMConfig } from './configs/typeorm.config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { WordModule } from './word/word.module';

@Module({
  imports: [
    // 환경변수 .env를 글로벌하게 사용할 수 있게 해줍니다.
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    // 사용자가 60초동안 최대 12번까지 요청을 보낼 수 있도록 설정하는 코드.   app.useGlobalGuards(new ThrottlerGuard());
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 12,
    }),
    // TypeORM 설정하는 코드
    TypeOrmModule.forRoot(typeORMConfig),
    // 유저 모듈을 가져오는 코드
    UserModule,

    // 에러 관련 코드
    ExceptionModule,

    WordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

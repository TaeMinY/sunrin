import { Logger, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { UserService } from "./user.service";
import { UserController } from "./user.controller";

import { UserRepository } from "./repository/user.repository";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";

@Module({
  // 컨트롤러 정의
  controllers: [UserController],
  // TypeORM 정의 - USER
  imports: [PassportModule, TypeOrmModule.forFeature([User])],
  // User Service, User Repository
  providers: [JwtStrategy, UserService, UserRepository],
})
export class UserModule {}

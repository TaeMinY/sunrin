import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { addHours, addDays } from "date-fns";

import { UserRepository } from "./repository/user.repository";
import { SignInReqDto } from "./dto/signin.dto";
import { SignUpReqDto } from "./dto/signup.dto";
import { User } from "./entities/user.entity";
import { TokenDto } from "./dto/token.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createToken(type, data: any): Promise<string> {
    const expirationTime = addHours(new Date(), 2);

    // 토큰 생성 코드
    const token = jwt.sign(
      { ...data, expirationTime },
      process.env.JWT_SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: type == "ACCESS_TOKEN" ? 7200 : 1209600,
      }
    );

    return token;
  }

  async signIn(body: SignInReqDto): Promise<User> {
    try {
      const userData = await this.userRepository.findById(body.id);
      if (userData != null) {
        // 패스워드 비교 코드
        const value = await bcrypt.compare(body.password, userData.password);

        if (value == true) {
          return userData;
        } else {
          throw new BadRequestException("");
        }
      } else {
        throw new BadRequestException("아이디가 없습니다.");
      }
    } catch (e) {
      throw new BadRequestException("");
    }
  }

  async signUp(body: SignUpReqDto): Promise<User | null> {
    try {
      const userData = await this.userRepository.createUser(
        body.id,
        body.password,
        body.username
      );

      return userData;
    } catch (e) {
      throw new BadRequestException("");
    }
  }

  async refreshToken(refreshTokenDto: TokenDto): Promise<any> {
    try {
      // JWT 복호화
      const user = jwt.verify(
        refreshTokenDto.refreshToken,
        process.env.JWT_SECRET_KEY
      );

      const userInfo = await this.userRepository.findByAccountId(
        user.accountId
      );
      if (userInfo == null) {
        throw new UnauthorizedException();
      }

      const accessToken = await this.createToken(
        { accountId: userInfo.accountId },
        "ACCESS_TOKEN"
      );
      // 나중에는 refreshToken의 만료일을 체크해서 발급
      const refreshToken = await this.createToken(
        { accountId: userInfo.accountId },
        "REFRESH_TOKEN"
      );

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException(
        "Refresh token이 유효하지 않거나 만료되었습니다."
      );
    }
  }
}

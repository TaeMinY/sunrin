import {
  Controller,
  Post,
  Body,
  UseGuards,
  Inject,
  Logger,
  LoggerService,
  ConflictException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';

import { GetUser } from 'src/common/decorators/get-user.decorator';

import { plainToInstance } from 'class-transformer';

import { SignInReqDto } from './dto/signin.dto';
import { SignUpReqDto } from './dto/signup.dto';
import { TokenDto } from './dto/token.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signin')
  async signIn(@Body() body: SignInReqDto) {
    const res = await this.userService.signIn(body);

    const accessToken = await this.userService.createToken('ACCESS_TOKEN', {
      accountId: res.accountId,
    });
    const refreshToken = await this.userService.createToken('REFRESH_TOKEN', {
      accountId: res.accountId,
    });

    return {
      message: '로그인을 하였습니다.',
      data: plainToInstance(TokenDto, {
        accessToken,
        refreshToken,
      }),
    };
  }

  @Post('signup')
  async signUp(@Body() body: SignUpReqDto) {
    const res = await this.userService.signUp(body);

    const accessToken = await this.userService.createToken('ACCESS_TOKEN', {
      accountId: res.accountId,
    });
    const refreshToken = await this.userService.createToken('REFRESH_TOKEN', {
      accountId: res.accountId,
    });

    return {
      message: '회원가입을 하였습니다.',
      data: plainToInstance(TokenDto, {
        accessToken,
        refreshToken,
      }),
    };
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: TokenDto, @GetUser() user) {
    const res = await this.userService.refreshToken(body);

    const accessToken = await this.userService.createToken('ACCESS_TOKEN', {
      accountId: res.accountId,
    });
    const refreshToken = await this.userService.createToken('REFRESH_TOKEN', {
      accountId: res.accountId,
    });

    return {
      message: '토큰을 재발급 받았습니다.',
      data: plainToInstance(TokenDto, {
        accessToken,
        refreshToken,
      }),
    };
  }
}

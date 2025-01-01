import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { WordService } from "./word.service";
import { CreateWordDto } from "./dto/create-word.dto";
import { UpdateWordDto } from "./dto/update-word.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { User } from "src/user/entities/user.entity";
import { plainToInstance } from "class-transformer";
import { Word } from "./entities/word.entity";
import { DeleteWordDto } from "./dto/delete-word.dto";

@Controller("word")
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post("create")
  @UseGuards(AuthGuard("jwt"))
  async create(@Body() createWordDto: CreateWordDto, @GetUser() user: User) {
    const res = await this.wordService.create(createWordDto, user);

    return {
      message: "단어를 추가하였습니다.",
      data: plainToInstance(Word, res),
    };
  }

  @Post("delete")
  @UseGuards(AuthGuard("jwt"))
  async delete(@Body() deleteWordDto: DeleteWordDto, @GetUser() user: User) {
    const res = await this.wordService.delete(deleteWordDto, user);

    return {
      message: "단어를 삭제하였습니다.",
      data: plainToInstance(Word, res),
    };
  }

  @Get("")
  @UseGuards(AuthGuard("jwt"))
  async get(@GetUser() user: User) {
    const res = await this.wordService.get(user);

    return {
      message: "단어 호출.",
      data: plainToInstance(Word, res),
    };
  }

  @Get("random")
  @UseGuards(AuthGuard("jwt"))
  async getRandom(@GetUser() user: User, @Query("count") count: number) {
    const res = await this.wordService.getRandom(count, user);

    return {
      message: "랜덤으로 단어를 호출하였습니다.",
      data: res,
    };
  }

  @Post("csat/save")
  @UseGuards(AuthGuard("jwt"))
  async saveCsatWord(@GetUser() user: User) {
    await this.wordService.saveCsatWord(user);

    return {
      message: "수능 영어단어 저장",
    };
  }

  @Post("init")
  @UseGuards(AuthGuard("jwt"))
  async initWord(@GetUser() user: User) {
    await this.wordService.initWord(user);

    return {
      message: "수능 영어단어 초기화",
    };
  }
}

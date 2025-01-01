import { ForbiddenException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Word } from "../entities/word.entity";
import { User } from "src/user/entities/user.entity";
import { words } from "../../configs/words.js";

@Injectable()
export class WordRepository extends Repository<Word> {
  constructor(
    @InjectRepository(Word)
    private readonly repository: Repository<Word>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  // 단어 생성
  async createWord(word: string, mean: string, user: User): Promise<Word> {
    const wordData = this.create({
      word,
      mean,
      users: user,
    });

    await this.save(wordData);
    return wordData;
  }

  // 단어 ID로 조회
  async findById(id: number): Promise<Word | null> {
    return await this.findOne({ where: { id: id } });
  }

  // 단어 삭제
  async deleteWord(id: number, user: User): Promise<Word | null> {
    const word = await this.findOne({
      where: { id: id, users: { accountId: user.accountId } },
    });
    if (!word) {
      return null; // 삭제 대상이 없으면 null 반환
    }

    await this.remove(word); // 조회된 엔티티를 삭제
    return word;
  }

  // 단어 호출
  async get(user: User): Promise<Word[]> {
    const words = this.find({
      where: { users: { accountId: user.accountId } },
    });

    return words;
  }

  async getRandom(count: number, user: User): Promise<Word[]> {
    try {
      const words = await this.createQueryBuilder("word")
        .where("word.users = :userId", { userId: user.accountId })
        .orderBy("RANDOM()")
        .take(count)
        .getMany();
      return words;
    } catch (e) {
      console.log(e);
    }
  }

  async saveCsatWord(user: User) {
    const wordEntities = words.map((word) =>
      this.create({
        ...word,
        users: user, // 사용자와 연관 설정
      })
    );

    return await this.save(wordEntities);
  }

  async initWord(user: User) {
    await this.delete({ users: { accountId: user.accountId } });
  }
}

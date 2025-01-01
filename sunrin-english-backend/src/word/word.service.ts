import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { UserRepository } from 'src/user/repository/user.repository';
import { WordRepository } from './repository/word.repository';
import { User } from 'src/user/entities/user.entity';
import { Word } from './entities/word.entity';
import { DeleteWordDto } from './dto/delete-word.dto';

@Injectable()
export class WordService {
  constructor(private readonly wordRepository: WordRepository) {}

  async create(createWordDto: CreateWordDto, user: User): Promise<Word> {
    const word = await this.wordRepository.createWord(
      createWordDto.word,
      createWordDto.mean,
      user,
    );

    return word;
  }

  async delete(deleteWordDto: DeleteWordDto, user: User): Promise<Word> {
    const word = await this.wordRepository.deleteWord(deleteWordDto.id, user);

    if (null) {
      throw new BadRequestException('ID가 존재하지 않습니다');
    }

    return word;
  }

  async get(user: User): Promise<Word[]> {
    const word = await this.wordRepository.get(user);

    return word;
  }

  async getRandom(count: number, user: User): Promise<Word[]> {
    const word = await this.wordRepository.getRandom(count, user);

    return word;
  }

  async saveCsatWord(user: User): Promise<Word[]> {
    const word = await this.wordRepository.saveCsatWord(user);

    return word;
  }
  async initWord(user: User): Promise<void> {
    const word = await this.wordRepository.initWord(user);
  }
}

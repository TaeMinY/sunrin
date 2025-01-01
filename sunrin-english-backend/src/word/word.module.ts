import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { JwtStrategy } from 'src/user/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import { WordRepository } from './repository/word.repository';

@Module({
  controllers: [WordController],
  imports:[PassportModule, TypeOrmModule.forFeature([Word, User])],
  providers: [WordService, JwtStrategy, UserRepository, WordRepository]
})
export class WordModule {}

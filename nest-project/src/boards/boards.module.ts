import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardsRepository } from './boards.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Board])],
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepository]
})
export class BoardsModule {}

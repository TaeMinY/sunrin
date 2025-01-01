import { BadRequestException, Injectable } from '@nestjs/common';
import { Board } from './entity/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { v4 as uuid } from "uuid";
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsRepository } from './boards.repository';

@Injectable()
export class BoardsService {
    constructor(private boardRepository: BoardsRepository){}

    async getAllBoards() {
        return await this.boardRepository.find();
    }

    createBoard(body: CreateBoardDto): Promise<Board>{
       return this.boardRepository.createBoard(body)
    }
    async getBoardById(id: number){
        const board = this.boardRepository.findOne({where: {id: id}});

        if(!board){
            throw new BadRequestException("에러메시지")
        }
        return board;
    }

    // deleteBoard(id: string){
    //     const board = this.getBoardById(id);

    //     this.boards = this.boards.filter((board) => board.id !== id);

    //     return board;
    // }

    updateBoard(body: UpdateBoardDto){
        return this.boardRepository.updateBoard(body)
    }

    async deleteBoard(id: number):Promise<void>{
        const result = await this.boardRepository.delete(id);

        if(result.affected === 0){
            throw new BadRequestException();
        }
        console.log(result);
    }
}

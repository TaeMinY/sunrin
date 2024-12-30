import { BadRequestException, Injectable } from '@nestjs/common';
import { Board } from './types/board';
import { CreateBoardDto } from './dto/create-board.dto';
import { v4 as uuid } from "uuid";
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {

    private boards: Board[] = [];
    
    getAllBoards(){
        return this.boards;
    }

    createBoard(body: CreateBoardDto){
        const utcTime = new Date();
        const kstTime = new Date(utcTime.getTime() + 9 * 60 *60*1000);

        const board: Board = {
            id: uuid(),
            title: body.title,
            text: body.text,
            createdAt: kstTime
        }

        this.boards.push(board);

        return board;
    }
    getBoardById(id: string){
        const board = this.boards.find((board) => board.id === id);

        if(!board){
            throw new BadRequestException("에러메시지")
        }
        return board;
    }

    deleteBoard(id: string){
        const board = this.getBoardById(id);

        this.boards = this.boards.filter((board) => board.id !== id);

        return board;
    }

    updateBoard(body: UpdateBoardDto){
        const {id, title, text} = body;

        const board = this.getBoardById(id);

        board.title = title;
        board.text = text;

        return board;
    }
}

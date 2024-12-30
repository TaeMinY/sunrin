import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './types/board';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

// http://localhost:3000/boards
@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService){}

    @Get('/')
    getAllBoards(): Board[] {
        return this.boardsService.getAllBoards();
    }

    // @Post("/")
    // createBoard(@Body("title") title: string, @Body("text") text: string){
    //     this.boardsService.createBoard(title, text);
    //     return `${title} / ${text}`
    // }
    

    @Post("/")
    createBoard(@Body() body: CreateBoardDto){
        return this.boardsService.createBoard(body);
    }

    @Get("/:id")
    getBoardById(@Param("id") id: string){
        return this.boardsService.getBoardById(id);
    }

    @Put('/')
    updateBoard(@Body() body: UpdateBoardDto){
        return this.boardsService.updateBoard(body);
    }

}

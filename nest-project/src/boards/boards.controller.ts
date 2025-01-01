import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardTitlePipe } from 'src/pipes/board-title.pipe';
import { Board } from './entity/board.entity';

// http://localhost:3000/boards
@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService){}

    @Get('/')
    async getAllBoards(): Promise<Board[]> {
        return await this.boardsService.getAllBoards();
    }

    // @Post("/")
    // createBoard(@Body("title", BoardTitlePipe ) title: string, @Body("text") text: string){
    //     // this.boardsService.createBoard(title, text);
    //     return `${title} / ${text}`
    // }
    

    @Post("/")
    createBoard(@Body() body: CreateBoardDto){
        return this.boardsService.createBoard(body);
    }

    @Get("/:id")
    getBoardById(@Param("id") id: number){
        return this.boardsService.getBoardById(id);
    }

    @Put('/')
    updateBoard(@Body() body: UpdateBoardDto){
        return this.boardsService.updateBoard(body);
    }

    @Delete("/:id")
    deleteBoard(@Param("id") id: number):Promise<void>{
        return this.boardsService.deleteBoard(id);
    }

}

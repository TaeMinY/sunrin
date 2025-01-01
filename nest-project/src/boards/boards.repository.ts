import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Board } from "./entity/board.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Injectable()
export class BoardsRepository extends Repository<Board>{
    constructor(@InjectRepository(Board) 
    private readonly repository: Repository<Board>){
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async createBoard(body: CreateBoardDto):Promise<Board>{
        const {title, text} = body;
        const board = this.create({title: title, text: text});
        
        await this.save(board);

        return board;
    }

    async updateBoard(body: UpdateBoardDto): Promise<Board>{
        const {id, title, text} = body;

        const board = await this.findOne({where:{id: id}});

        if(!board){
            throw new BadRequestException();
        }

        board.title = title;
        board.text = text;

        await this.save(board);

        return board;
    }
}
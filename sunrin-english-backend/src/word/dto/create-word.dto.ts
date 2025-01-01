import { IsString } from "class-validator";

export class CreateWordDto {
    @IsString()
    word:string;

    @IsString()
    mean: string;
}

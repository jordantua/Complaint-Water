import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty({message:'name tidak boleh kosong'})
    @IsString()
    name:string;
}

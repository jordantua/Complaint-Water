import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePersonalDto {
    @IsNotEmpty({message:'nama tidak boleh kosong'})
    @IsString()
    name:string;
    
    @IsNotEmpty({message:'email tidak boleh kosong'})
    email:string;
}

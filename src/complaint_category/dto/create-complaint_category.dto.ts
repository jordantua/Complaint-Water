import { IsNotEmpty, IsString } from "class-validator";

export class CreateComplaintCategoryDto {
    @IsNotEmpty({message:'name tidak boleh kosong'})
    @IsString()
    name:string;
    
    @IsNotEmpty({message:'email tidak boleh kosong'})
    class:number;
}

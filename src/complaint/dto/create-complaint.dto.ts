import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateComplaintDto {
    @IsNotEmpty({message:'nama tidak boleh kosong'})
    @IsString()
    desc:string;
    
    @IsNotEmpty({message:'image tidak boleh kosong'})
    Image:string;

    @IsNotEmpty({message:'meter_id tidak boleh kosong'})
    meteranId:number;

    @IsNotEmpty({message:'status tidak boleh kosong'})
    status:number;

    @IsNotEmpty({message:'complaint_cat tidak boleh kosong'})
    complaint_cat_isId:number;
}

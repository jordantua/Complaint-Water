import { IsNotEmpty, IsString } from "class-validator";

export class CreateComplaintHandlingDto {
    @IsNotEmpty({message:'nama tidak boleh kosong'})
    @IsString()
    notes:string;
    
    @IsNotEmpty({message:'image tidak boleh kosong'})
    complaint_ownById:number;

    @IsNotEmpty({message:'meter_id tidak boleh kosong'})
    task_ownById:number;
}

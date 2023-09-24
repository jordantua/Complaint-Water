import { IsNotEmpty, IsString } from "class-validator";

export class CreateMeterDto {
    @IsNotEmpty({message:'code tidak boleh kosong'})
    code:string;
    
    @IsNotEmpty({message:'address tidak boleh kosong'})
    address:string;
    
    @IsNotEmpty({message:'lat tidak boleh kosong'})
    lat:string;
    
    @IsNotEmpty({message:'long tidak boleh kosong'})
    long:string;
}

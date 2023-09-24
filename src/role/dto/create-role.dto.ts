import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty({message:'name role tidak boleh kosong'})
    @IsString()
    name:string;
}

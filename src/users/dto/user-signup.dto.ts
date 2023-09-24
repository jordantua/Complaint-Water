import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignUpDto{
    @IsNotEmpty({message:'username tidak boleh kosong'})
    @IsString()
    username:string;
    
    @IsNotEmpty({message:'password tidak boleh kosong'})
    @MinLength(5,{message:'password min 5 karakter'})
    password:string;
}
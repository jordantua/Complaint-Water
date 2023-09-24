import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';
import { Roles } from 'src/utility/common/user-roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignUpDto:UserSignUpDto):Promise<UserEntity>{
    const userExist = await this.findUserByUsername(userSignUpDto.username);

    if(userExist) throw new BadRequestException('Username not Available.');

    userSignUpDto.password = await hash(userSignUpDto.password, 10);

    let user=this.usersRepository.create(userSignUpDto);
    user = await this.usersRepository.save(user);

    delete user.password
    return user;
  }

  async signin(userSignInDto:UserSignInDto):Promise<UserEntity>{
    // const userExist = await this.findUserByUsername(userSignInDto.username);
    //With Query
    const userExist = await this.usersRepository.createQueryBuilder('users').addSelect('users.password')
    .where('users.username=:username',{username:userSignInDto.username}).getOne();

    if(!userExist) throw new BadRequestException('Username not found.');

    const matchPassword = await compare(userSignInDto.password, userExist.password);
    if(!matchPassword) throw new BadRequestException("Username and Password didnt match");

    delete userExist.password
    return userExist;

  }


  async accessToken(user:UserEntity):Promise<string>{
    return sign({
      id:user.id,
      // username:user.username
    },process.env.ACCESS_TOKEN_SECRET_KEY,{
      expiresIn:process.env.ACCESS_TOKEN_SECRET_EXPIRE_TIME
    })
  }
  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll():Promise<UserEntity[]>  {
    return await this.usersRepository.find();
  }

  async findOne(id: number):Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where:{id:id},
      relations:{personals:true},
      select:{
        personals:{
          id:true,
          name:true,
          email:true
        },
      }
    });

    if(!user) throw new NotFoundException("user tidak di temukan");

    return user;
  }
  async findOneQuery(id: number):Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where:{id:id},
      // relations:{personals:true},
      relations: ['personals','personals.ownBy'],
      select:{
        personals:{
          id:true,
          name:true,
          email:true
        },
      }
    });

    if(!user) throw new NotFoundException("user tidak di temukan");

    return user;
  }

  async findOneByUsername(username: string):Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({username});

    if(!user) throw new NotFoundException("user tidak di temukan");

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByUsername(username:string){
    return await this.usersRepository.findOneBy({username});
  }

  async editRoles(id: number, name: string):Promise<UserEntity> {
    let nama = [];
    if(name === 'admin') {nama = await [Roles.ADMIN];}
    else if(name === 'user') {nama = await [Roles.USER];}
    else if(name === 'officer') {nama = await [Roles.OFFICER];}
    else{throw new NotFoundException("role tidak di temukan");}

    let user = await this.findOne(id);
    user.roles = nama;
    // return await nama

    return await this.usersRepository.save(user);
  }
}

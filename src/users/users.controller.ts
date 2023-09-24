import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async signup(@Body() userSignUpDto:UserSignUpDto):Promise<{user:UserEntity}>{
    // console.log(body);
    // return 'hi';
    return {user:await this.usersService.signup(userSignUpDto)};
  }

  @Post('login')
  async signin(@Body() userSignInDto:UserSignInDto):Promise<{
    accessToken:string,user:UserEntity
  }>{
    const user =  await this.usersService.signin(userSignInDto);

    const accessToken = await this.usersService.accessToken(user);
    return {accessToken,user};
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // return this.usersService.create(createUserDto);
    return 'hi';
  }

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('all')
  async findAll():Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string):Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @Get('single/byUsername/:username')
  async findOneByUsername(@Param('username') username: string):Promise<UserEntity> {
    return await this.usersService.findOneByUsername(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Get('whoami')
  getProfile(@CurrentUser() CurrentUser:UserEntity){
    return CurrentUser;
  }

  @UseGuards(AuthenticationGuard)
  @Put('roles/:id/name/:name')
  async putRoles(@Param('id') id: string, @Param('name') name: string):Promise<UserEntity> {
    return await this.usersService.editRoles(+id, name);
  }
}

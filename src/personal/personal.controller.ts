import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { PersonalEntity } from './entities/personal.entity';

@Controller('personal')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  // @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard)
  @Post()
  async create(@Body() createPersonalDto: CreatePersonalDto, @CurrentUser() CurrentUser:UserEntity){
    return await this.personalService.create(createPersonalDto,CurrentUser);
  }

  @Get()
  findAll() {
    return this.personalService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.personalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonalDto: UpdatePersonalDto) {
    return this.personalService.update(+id, updatePersonalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MeterService } from './meter.service';
import { CreateMeterDto } from './dto/create-meter.dto';
import { UpdateMeterDto } from './dto/update-meter.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { Roles } from 'src/utility/common/user-roles.enum';
import { PersonalService } from 'src/personal/personal.service';

@Controller('meter')
export class MeterController {
  constructor(private readonly meterService: MeterService, private readonly personalService: PersonalService) {}

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard)
  @Post('/:id')
  async create(@Param('id') id: number,@Body() createMeterDto: CreateMeterDto) {
    const personalData = await this.personalService.findOne(+id);
    // return personalData;
    return await this.meterService.create(personalData,createMeterDto);
  }

  @UseGuards(AuthenticationGuard)
  @Get('/me')
  async findMe(@CurrentUser() CurrentUser:UserEntity) {
    // return CurrentUser;
    return await this.meterService.findMine(CurrentUser);
    // return this.meterService.findAll();
  }

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard)
  @Get()
  findAll() {
    return this.meterService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.meterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeterDto: UpdateMeterDto) {
    return this.meterService.update(+id, updateMeterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meterService.remove(+id);
  }
}

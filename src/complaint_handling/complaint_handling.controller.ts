import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ComplaintHandlingService } from './complaint_handling.service';
import { CreateComplaintHandlingDto } from './dto/create-complaint_handling.dto';
import { UpdateComplaintHandlingDto } from './dto/update-complaint_handling.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('complaint-handling')
export class ComplaintHandlingController {
  constructor(private readonly complaintHandlingService: ComplaintHandlingService) {}

  // @AuthorizeRoles(Roles.OFFICER)
  @UseGuards(AuthenticationGuard)
  @Post()
  create(@Body() createComplaintHandlingDto: CreateComplaintHandlingDto, @CurrentUser() currentUser:UserEntity) {
    return this.complaintHandlingService.create(createComplaintHandlingDto, currentUser);
  }

  @Get()
  findAll() {
    return this.complaintHandlingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complaintHandlingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComplaintHandlingDto: UpdateComplaintHandlingDto) {
    return this.complaintHandlingService.update(+id, updateComplaintHandlingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complaintHandlingService.remove(+id);
  }
}

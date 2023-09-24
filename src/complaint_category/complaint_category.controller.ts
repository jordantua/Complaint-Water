import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ComplaintCategoryService } from './complaint_category.service';
import { CreateComplaintCategoryDto } from './dto/create-complaint_category.dto';
import { UpdateComplaintCategoryDto } from './dto/update-complaint_category.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';

@Controller('complaint-category')
export class ComplaintCategoryController {
  constructor(private readonly complaintCategoryService: ComplaintCategoryService) {}

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard)
  @Post()
  async create(@Body() createComplaintCategoryDto: CreateComplaintCategoryDto) {
    // return createComplaintCategoryDto;
    const personalData = await this.complaintCategoryService.checkExist(createComplaintCategoryDto.name);
    // return personalData;
    return await this.complaintCategoryService.create(createComplaintCategoryDto);
  }

  @UseGuards(AuthenticationGuard)
  @Get()
  findAll() {
    return this.complaintCategoryService.findAll();
  }

  @UseGuards(AuthenticationGuard)
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.complaintCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComplaintCategoryDto: UpdateComplaintCategoryDto) {
    return this.complaintCategoryService.update(+id, updateComplaintCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complaintCategoryService.remove(+id);
  }
}

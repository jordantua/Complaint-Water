import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComplaintImagesService } from './complaint_images.service';
import { CreateComplaintImageDto } from './dto/create-complaint_image.dto';
import { UpdateComplaintImageDto } from './dto/update-complaint_image.dto';

@Controller('complaint-images')
export class ComplaintImagesController {
  constructor(private readonly complaintImagesService: ComplaintImagesService) {}

  @Post()
  create(@Body() createComplaintImageDto: CreateComplaintImageDto) {
    return this.complaintImagesService.create(createComplaintImageDto);
  }

  @Get()
  findAll() {
    return this.complaintImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complaintImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComplaintImageDto: UpdateComplaintImageDto) {
    return this.complaintImagesService.update(+id, updateComplaintImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complaintImagesService.remove(+id);
  }
}

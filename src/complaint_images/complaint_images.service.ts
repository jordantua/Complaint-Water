import { Injectable } from '@nestjs/common';
import { CreateComplaintImageDto } from './dto/create-complaint_image.dto';
import { UpdateComplaintImageDto } from './dto/update-complaint_image.dto';

@Injectable()
export class ComplaintImagesService {
  create(createComplaintImageDto: CreateComplaintImageDto) {
    return 'This action adds a new complaintImage';
  }

  findAll() {
    return `This action returns all complaintImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} complaintImage`;
  }

  update(id: number, updateComplaintImageDto: UpdateComplaintImageDto) {
    return `This action updates a #${id} complaintImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} complaintImage`;
  }
}

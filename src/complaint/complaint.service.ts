import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplaintEntity } from './entities/complaint.entity';
import { Repository } from 'typeorm';
import { MeterEntity } from 'src/meter/entities/meter.entity';
import { ComplaintCategoryEntity } from 'src/complaint_category/entities/complaint_category.entity';
import { MeterService } from 'src/meter/meter.service';
import { ComplaintCategoryService } from 'src/complaint_category/complaint_category.service';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectRepository(ComplaintEntity)
    private readonly complaintRepository: Repository<ComplaintEntity>,
    private readonly meterService:MeterService,
    private readonly categoryComplaintService:ComplaintCategoryService,
  ) {}
  
  async create(createComplaintDto: CreateComplaintDto) {

    try{
      const meterannya = await this.meterService.findOne(+createComplaintDto.meteranId);
      const complaint_kat = await this.categoryComplaintService.findOne(+createComplaintDto.complaint_cat_isId);

      const created = this.complaintRepository.create(createComplaintDto);
      created.meteran = meterannya;
      created.complaint_cat_is = complaint_kat;
      created.status = 0;
      // return await created;
      return await this.complaintRepository.save(created);

      // return 'This action adds a new complaint';
    }catch(err){
      console.log(err);
      return err;
    }
  }

  async findAll() {
    return await this.complaintRepository.find({
      relations: ['complaint_handling_by', 'complaint_handling_by.handling_by','complaint_cat_is','meteran'],
    });
  }

  async findOne(id: number) {
    const complaint = await this.complaintRepository.findOne({
      where:{id:id},
      relations: ['complaint_handling_by', 'complaint_handling_by.handling_by','complaint_cat_is','meteran'],
      // relations:{
      //   complaint_handling_by:true,\
      //   complaint_cat_is:true,
      //   meteran:true
      // },
    });

    if(!complaint) throw new NotFoundException("complaint tidak di temukan");

    return complaint;
  }

  async update(id: number, updateComplaintDto: Partial<UpdateComplaintDto>) {
    const complaint = await this.findOne(id);
    Object.assign(complaint, updateComplaintDto);
    if(updateComplaintDto.status){
      complaint.status = updateComplaintDto.status
    }
    if(updateComplaintDto.desc){
      complaint.desc = updateComplaintDto.desc
    }
    if(updateComplaintDto.Image){
      complaint.Image = updateComplaintDto.Image
    }

    const updated = this.complaintRepository.save(complaint);
    return updated;

    // return `This action updates a #${id} complaint`;
  }

  remove(id: number) {
    return `This action removes a #${id} complaint`;
  }
}

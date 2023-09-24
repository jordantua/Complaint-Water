import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateComplaintCategoryDto } from './dto/create-complaint_category.dto';
import { UpdateComplaintCategoryDto } from './dto/update-complaint_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplaintCategoryEntity } from './entities/complaint_category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComplaintCategoryService {

  constructor(
    @InjectRepository(ComplaintCategoryEntity)
    private readonly complaintCategoryRepository: Repository<ComplaintCategoryEntity>,
  ) {}

  async create(createComplaintCategoryDto: CreateComplaintCategoryDto) {
    // return await createComplaintCategoryDto;
    // console.log(createComplaintCategoryDto);

    const data = this.complaintCategoryRepository.create(createComplaintCategoryDto);
    return await this.complaintCategoryRepository.save(data);

    // return 'This action adds a new complaintCategory';
  }

  async findAll() {
    return await this.complaintCategoryRepository.find(); 
    // return `This action returns all complaintCategory`;
  }

  async findOne(id: number) {
    return await this.complaintCategoryRepository.findOneBy({id}); 
    // return `This action returns a #${id} complaintCategory`;
  }

  async checkExist(name: string){
    // console.log(name);
    const data = await this.complaintCategoryRepository.findOne({
      where:{name:name}
    });

    if(data) throw new BadRequestException("Silahkan pilih nama lain");

    return data;
  }
  

  update(id: number, updateComplaintCategoryDto: UpdateComplaintCategoryDto) {
    return `This action updates a #${id} complaintCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} complaintCategory`;
  }
}

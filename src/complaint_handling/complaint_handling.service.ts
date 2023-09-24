import { Injectable } from '@nestjs/common';
import { CreateComplaintHandlingDto } from './dto/create-complaint_handling.dto';
import { UpdateComplaintHandlingDto } from './dto/update-complaint_handling.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplaintHandlingEntity } from './entities/complaint_handling.entity';
import { ComplaintService } from 'src/complaint/complaint.service';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { TaskService } from 'src/task/task.service';
import { PersonalService } from 'src/personal/personal.service';

@Injectable()
export class ComplaintHandlingService {
  constructor(
    @InjectRepository(ComplaintHandlingEntity)
    private readonly complaintHandlingRepository: Repository<ComplaintHandlingEntity>,
    private complaintService:ComplaintService,
    private taskService:TaskService,
    private personalService:PersonalService
  ) {}
  
  async create(createComplaintHandlingDto: CreateComplaintHandlingDto, currentUser: UserEntity) {
    
    try{

      const complaint = await this.complaintService.findOne(+createComplaintHandlingDto.complaint_ownById);
      const task = await this.taskService.findOne(+createComplaintHandlingDto.task_ownById);
      const personal = await this.personalService.findOne(+currentUser.personals.id)
      // return personal;

      const created = this.complaintHandlingRepository.create(createComplaintHandlingDto);
      created.complaint_ownBy = complaint;
      created.task_ownBy = task;
      created.handling_by = personal;

      complaint.status = 1;
      const updateStatus = await this.complaintService.update(complaint.id,complaint);
      if(updateStatus){
        return await this.complaintHandlingRepository.save(created);
        // return created;
      }
    }catch(err){
      console.log(err);
      return err;
    }

    // return 'This action adds a new complaintHandling';
  }

  findAll() {
    return `This action returns all complaintHandling`;
  }

  findOne(id: number) {
    return `This action returns a #${id} complaintHandling`;
  }

  update(id: number, updateComplaintHandlingDto: UpdateComplaintHandlingDto) {
    return `This action updates a #${id} complaintHandling`;
  }

  remove(id: number) {
    return `This action removes a #${id} complaintHandling`;
  }
}

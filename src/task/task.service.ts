import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const data = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(data);
    // return 'This action adds a new task';
  }

  async findAll() {
    return await this.taskRepository.find(); 
    // return `This action returns all task`;
  }
  
  async findOne(id: number) {
    const data = await this.taskRepository.findOneBy({id}); 
    if(!data) throw new NotFoundException("task data tidak di temukan");

    return data;
    // return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}

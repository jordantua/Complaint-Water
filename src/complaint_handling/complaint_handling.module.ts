import { Module } from '@nestjs/common';
import { ComplaintHandlingService } from './complaint_handling.service';
import { ComplaintHandlingController } from './complaint_handling.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplaintHandlingEntity } from './entities/complaint_handling.entity';
import { ComplaintModule } from 'src/complaint/complaint.module';
import { TaskModule } from 'src/task/task.module';
import { PersonalModule } from 'src/personal/personal.module';

@Module({
  imports:[TypeOrmModule.forFeature([ComplaintHandlingEntity]),ComplaintModule, TaskModule, PersonalModule],
  controllers: [ComplaintHandlingController],
  providers: [ComplaintHandlingService],
})
export class ComplaintHandlingModule {}

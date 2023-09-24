import { Module } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { ComplaintController } from './complaint.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplaintEntity } from './entities/complaint.entity';
import { MeterService } from 'src/meter/meter.service';
import { MeterEntity } from 'src/meter/entities/meter.entity';
import { ComplaintCategoryEntity } from 'src/complaint_category/entities/complaint_category.entity';
import { MeterModule } from 'src/meter/meter.module';
import { ComplaintCategoryModule } from 'src/complaint_category/complaint_category.module';

@Module({
  imports:[TypeOrmModule.forFeature([ComplaintEntity]),MeterModule,ComplaintCategoryModule],
  controllers: [ComplaintController],
  providers: [ComplaintService],
  exports:[ComplaintService]
})
export class ComplaintModule {}

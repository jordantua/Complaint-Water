import { Module } from '@nestjs/common';
import { ComplaintCategoryService } from './complaint_category.service';
import { ComplaintCategoryController } from './complaint_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplaintCategoryEntity } from './entities/complaint_category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ComplaintCategoryEntity])],
  controllers: [ComplaintCategoryController],
  providers: [ComplaintCategoryService],
  exports:[ComplaintCategoryService],
})
export class ComplaintCategoryModule {}

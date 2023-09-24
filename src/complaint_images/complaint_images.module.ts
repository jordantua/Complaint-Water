import { Module } from '@nestjs/common';
import { ComplaintImagesService } from './complaint_images.service';
import { ComplaintImagesController } from './complaint_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplaintImageEntity } from './entities/complaint_image.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ComplaintImageEntity])],
  controllers: [ComplaintImagesController],
  providers: [ComplaintImagesService],
})
export class ComplaintImagesModule {}

import { Module } from '@nestjs/common';
import { MeterService } from './meter.service';
import { MeterController } from './meter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeterEntity } from './entities/meter.entity';
import { PersonalEntity } from 'src/personal/entities/personal.entity';
import { PersonalModule } from 'src/personal/personal.module';

@Module({
  imports:[TypeOrmModule.forFeature([MeterEntity]), PersonalModule],
  controllers: [MeterController],
  providers: [MeterService],
  exports:[MeterService],
})
export class MeterModule {}

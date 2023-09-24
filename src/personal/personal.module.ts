import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { PersonalController } from './personal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalEntity } from './entities/personal.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PersonalEntity])],
  controllers: [PersonalController],
  providers: [PersonalService],
  exports:[PersonalService]
})
export class PersonalModule {}

import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeterDto } from './dto/create-meter.dto';
import { UpdateMeterDto } from './dto/update-meter.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MeterEntity } from './entities/meter.entity';
import { IsNull, Repository } from 'typeorm';
import { PersonalEntity } from 'src/personal/entities/personal.entity';

@Injectable()
export class MeterService {
  constructor(
    @InjectRepository(MeterEntity)
    private readonly meterRepository: Repository<MeterEntity>,
  ) {}

  async create(personalData: any, createMeterDto: CreateMeterDto) {
    // return await currentUser.personals
    try{
      // console.log(personalData);

      const cekMEter = await this.findOneByCode(createMeterDto.code);

      const meter = this.meterRepository.create(createMeterDto);
      meter.ownBy = personalData;
      return await this.meterRepository.save(meter);
    }catch(err){
      console.log(err);
      return err;
    }

    // return 'This action adds a new meter';
  }

  async findMine(CurrentUser) {
    // return CurrentUser;
    const ownBy = CurrentUser.personals.id;
    console.log(ownBy);

    const data = await this.meterRepository.createQueryBuilder('meters')
    .addSelect('meters.ownById')
    .where('meters.ownById=:ownBy',{ownBy:ownBy})
    .getMany();
    return data;

    // const data = await this.meterRepository.find({
    //   where:{ownBy:ownBy,deleted_at:IsNull()},
    //   relations:{ownBy}
    // });
    // if(!data) throw new NotFoundException("data tidak di temukan");
    // return data;
    // return `This action returns all meter`;
  }

  async findAll() {
    return await this.meterRepository.find({
      // relations:{ownBy:true},
      relations: ['ownBy', 'ownBy.user'],
    });
    // return `This action returns all meter`;
  }

  async findOne(id: number) {
    const meter = await this.meterRepository.findOne({
      where:{
        id:id
      },
      relations: ['ownBy'],
    });

    if(!meter) throw new NotFoundException("meter tidak di temukan");

    return meter;
    // return `This action returns a #${id} meter`;
  }

  async findOneByCode(code: string) {
    const meter = await this.meterRepository.findOne({
      where:{
        code:code
      },
      relations: ['ownBy'],
    });

    if(meter) throw new BadRequestException("meter ditemukan, mohon pakai code lain");

    return meter;
    // return `This action returns a #${id} meter`;
  }

  async findOnly(id: number) {
    return await this.meterRepository.findOne({
      where:{
        id:id
      }
    });
    // return `This action returns a #${id} meter`;
  }

  update(id: number, updateMeterDto: UpdateMeterDto) {
    return `This action updates a #${id} meter`;
  }

  remove(id: number) {
    return `This action removes a #${id} meter`;
  }
}

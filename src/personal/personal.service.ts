import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalEntity } from './entities/personal.entity';
import { Repository } from 'typeorm';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class PersonalService {
  constructor(
    @InjectRepository(PersonalEntity)
    private readonly personalRepository: Repository<PersonalEntity>,
  ) {}

  async create(createPersonalDto: CreatePersonalDto, currentUser:UserEntity){
    const personalExist = await this.findOneByEmail(createPersonalDto.email);

    if(personalExist) throw new BadRequestException('Email not Available.');

    const personal = this.personalRepository.create(createPersonalDto);
    
    personal.user = currentUser;
    return await this.personalRepository.save(personal);

    // return 'This action adds a new personal';
  }

  findAll() {
    return `This action returns all personal`;
  }

  async findOneByEmail(email: string) {
    const personal = await this.personalRepository.findOneBy({email});

    if(personal) throw new BadRequestException("user temukan silah edit saja");

    return personal;
  }

  async findOne(id: number) {
    const personal = await this.personalRepository.findOne({
      where:{id:id},
      relations:{user:true},
      select:{
        user:{
          id:true,
          username:true

        }
      }
    });

    if(!personal) throw new NotFoundException("personal tidak di temukan");

    return personal;
  }

  update(id: number, updatePersonalDto: UpdatePersonalDto) {
    return `This action updates a #${id} personal`;
  }

  remove(id: number) {
    return `This action removes a #${id} personal`;
  }
}

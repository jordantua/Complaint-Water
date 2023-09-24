import { ComplaintEntity } from "src/complaint/entities/complaint.entity";
import { MeterEntity } from "src/meter/entities/meter.entity";
import { PersonalEntity } from "src/personal/entities/personal.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Entity,PrimaryGeneratedColumn,Column, Unique, CreateDateColumn, Timestamp, OneToOne, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({name:'complaintcategorys'})
export class ComplaintCategoryEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    name:string;

    @Column({nullable:false})
    class:number;
    
    @OneToMany(() => ComplaintEntity,(cat) => cat.complaint_cat_is)
    complaint_cat:MeterEntity[];
}

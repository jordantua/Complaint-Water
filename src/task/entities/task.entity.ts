import { ComplaintEntity } from "src/complaint/entities/complaint.entity";
import { ComplaintCategoryEntity } from "src/complaint_category/entities/complaint_category.entity";
import { ComplaintHandlingEntity } from "src/complaint_handling/entities/complaint_handling.entity";
import { MeterEntity } from "src/meter/entities/meter.entity";
import { PersonalEntity } from "src/personal/entities/personal.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Entity,PrimaryGeneratedColumn,Column, Unique, CreateDateColumn, Timestamp, OneToOne, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({name:'tasks'})
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    name:string;

    @Column({nullable:true})
    desc:string;

    @CreateDateColumn()
    created_at:Timestamp;
    
    @UpdateDateColumn()
    updated_at:Timestamp;

    @DeleteDateColumn()
    delete_at:Timestamp;
    
    @OneToMany(() => ComplaintHandlingEntity,(cat) => cat.task_ownBy)
    task:MeterEntity[];
}

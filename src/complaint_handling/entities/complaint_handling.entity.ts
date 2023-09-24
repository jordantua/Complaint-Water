import { ComplaintEntity } from "src/complaint/entities/complaint.entity";
import { ComplaintCategoryEntity } from "src/complaint_category/entities/complaint_category.entity";
import { MeterEntity } from "src/meter/entities/meter.entity";
import { PersonalEntity } from "src/personal/entities/personal.entity";
import { TaskEntity } from "src/task/entities/task.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Entity,PrimaryGeneratedColumn,Column, Unique, CreateDateColumn, Timestamp, OneToOne, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";

@Entity({name:'complainthandlings'})
export class ComplaintHandlingEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    notes:string;

    @CreateDateColumn()
    created_at:Timestamp;
    
    @UpdateDateColumn()
    updated_at:Timestamp;

    @OneToOne(() => ComplaintEntity,(cat) => cat.complaint_handling_by)
    @JoinColumn()
    complaint_ownBy:ComplaintEntity
    
    @ManyToOne(() => TaskEntity,(cat) => cat.task)
    task_ownBy:TaskEntity

    @ManyToOne(() => PersonalEntity,(cat) => cat.handlers)
    handling_by:PersonalEntity;
}

import { ComplaintCategoryEntity } from "src/complaint_category/entities/complaint_category.entity";
import { ComplaintHandlingEntity } from "src/complaint_handling/entities/complaint_handling.entity";
import { ComplaintImageEntity } from "src/complaint_images/entities/complaint_image.entity";
import { MeterEntity } from "src/meter/entities/meter.entity";
import { PersonalEntity } from "src/personal/entities/personal.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Entity,PrimaryGeneratedColumn,Column, Unique, CreateDateColumn, Timestamp, OneToOne, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({name:'complaints'})
export class ComplaintEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    desc:string;

    @Column({nullable:false,default:0})
    status:number;

    @Column({nullable:false})
    Image:string;

    @CreateDateColumn()
    created_at:Timestamp;
    
    @UpdateDateColumn()
    updated_at:Timestamp;

    @OneToOne(() => ComplaintHandlingEntity,(cat) => cat.complaint_ownBy)
    complaint_handling_by:ComplaintHandlingEntity;

    @ManyToOne(() => ComplaintCategoryEntity,(cat) => cat.complaint_cat)
    complaint_cat_is:ComplaintCategoryEntity;

    @ManyToOne(() => MeterEntity,(cat) => cat.complaint)
    meteran:MeterEntity;

    // @OneToMany(() => ComplaintImageEntity,(cat) => cat.image_ownBy)
    // complaint_image:ComplaintImageEntity[];
}

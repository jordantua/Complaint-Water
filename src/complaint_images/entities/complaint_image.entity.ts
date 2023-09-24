import { ComplaintEntity } from "src/complaint/entities/complaint.entity";
import { ComplaintCategoryEntity } from "src/complaint_category/entities/complaint_category.entity";
import { MeterEntity } from "src/meter/entities/meter.entity";
import { PersonalEntity } from "src/personal/entities/personal.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Entity,PrimaryGeneratedColumn,Column, Unique, CreateDateColumn, Timestamp, OneToOne, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm";

@Entity({name:'complaintimages'})
export class ComplaintImageEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    file_name:string;

    @Column({default:true})
    is_primary:Boolean;

    @CreateDateColumn()
    created_at:Timestamp;
    
    @UpdateDateColumn()
    updated_at:Timestamp;
    
    // @ManyToOne(() => ComplaintEntity,(cat) => cat.complaint_image)
    // image_ownBy:MeterEntity;
    
}

import { ComplaintEntity } from "src/complaint/entities/complaint.entity";
import { PersonalEntity } from "src/personal/entities/personal.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Entity,PrimaryGeneratedColumn,Column, Unique, CreateDateColumn, Timestamp, OneToOne, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({name:'meters'})
export class MeterEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    code:string;

    @Column()
    address:string;

    @Column()
    lat:string;

    @Column()
    long:string;

    @CreateDateColumn()
    created_at:Timestamp;
    
    @UpdateDateColumn()
    updated_at:Timestamp;

    @DeleteDateColumn()
    deleted_at:Timestamp;

    @ManyToOne(() => PersonalEntity,(personal) => personal.meter)
    ownBy:PersonalEntity

    @OneToMany(() => ComplaintEntity,(complaint) => complaint.meteran)
    complaint:MeterEntity
}

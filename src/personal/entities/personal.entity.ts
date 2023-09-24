import { ComplaintHandlingEntity } from "src/complaint_handling/entities/complaint_handling.entity";
import { MeterEntity } from "src/meter/entities/meter.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Entity,PrimaryGeneratedColumn,Column, Unique, CreateDateColumn, Timestamp, OneToOne, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn } from "typeorm";

@Entity({name:'personals'})
export class PersonalEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique:true})
    email:string;

    @Column({nullable:true})
    full_name:string;

    @Column({nullable:true})
    avatar_file_name:string;

    @CreateDateColumn()
    created_at:Timestamp;
    
    @UpdateDateColumn()
    updated_at:Timestamp;

    @DeleteDateColumn()
    deleted_at:Timestamp;

    @OneToOne(() => UserEntity,(user) => user.personals)
    @JoinColumn()
    user:UserEntity

    @OneToMany(() => MeterEntity,(meter) => meter.ownBy)
    meter:MeterEntity[];

    @OneToMany(() => ComplaintHandlingEntity,(cat) => cat.handling_by)
    handlers:ComplaintHandlingEntity[];

}

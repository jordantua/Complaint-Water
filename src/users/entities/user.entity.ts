import { PersonalEntity } from "src/personal/entities/personal.entity";
import { Roles } from "src/utility/common/user-roles.enum";
import { Entity,PrimaryGeneratedColumn,Column, Unique, CreateDateColumn, Timestamp, OneToOne, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    username:string;

    @Column({select:false})
    password:string;

    @Column({type:'enum', enum:Roles,array:true,default:[Roles.USER]})
    roles:Roles[];

    @CreateDateColumn()
    created_at:Timestamp;
    
    @UpdateDateColumn()
    updated_at:Timestamp;

    @DeleteDateColumn()
    deleted_at:Timestamp;

    @OneToOne(() => PersonalEntity,(cat) => cat.user)
    personals:PersonalEntity;

}

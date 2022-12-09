import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Rating } from './rating.entity';

@Entity('users')
export class User extends BaseEntity {

  @Column({ 
    unique: true, 
    nullable: false
  })
  name: string;
  
  @OneToMany(() => Rating, rating => rating.user)
  record: Rating[];

}
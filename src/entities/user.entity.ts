import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Rating } from './rating.entity';

@Entity('users')
export class User extends BaseEntity {

  @Column({ 
    nullable: false,
  })
  name: string;

  @Column({ 
    unique: true, 
    nullable: false,
  })
  email: string;
  
  @OneToMany(() => Rating, rating => rating.user)
  record: Rating[];

}
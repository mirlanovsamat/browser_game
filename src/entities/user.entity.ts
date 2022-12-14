import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {

  @Column({ 
    nullable: false,
  })
  name: string;

  @Column({ 
    nullable: false,
  })
  email: string;
  
  @Column({ 
    nullable: false,
  })
  record: number;

}
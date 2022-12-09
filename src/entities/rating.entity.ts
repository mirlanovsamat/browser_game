import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('ratings')
export class Rating extends BaseEntity {

  @Column()
  record: number
  
  @ManyToOne(() => User, user => user.record)
  user: User;

}
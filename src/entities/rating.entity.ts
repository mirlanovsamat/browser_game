import { Column, Entity, JoinColumn, ManyToOne, } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'ratings' })
export class Rating extends BaseEntity {

  @Column()
  record: string;

  @ManyToOne(() => User, (user) => user.rating)
  @JoinColumn()
  user: User
}
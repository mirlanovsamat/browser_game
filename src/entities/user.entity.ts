import { Column, Entity, JoinColumn, OneToMany, } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Rating } from './rating.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {

  @Column({unique: true})
  name: string;

  @OneToMany(() => Rating, (rating) => rating.user)
  @JoinColumn()
  rating: Rating
}

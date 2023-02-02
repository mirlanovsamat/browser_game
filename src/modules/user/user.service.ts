import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.save(createUserDto);
      return user;
    } catch (error) {
      return error;
    }
  }
  async find(query): Promise<User[]> {
    try {
      const skip = query.page === 1 ? 0 : (query.page - 1) * query.take;
      const users = await this.userRepository.find({
        order: { record: 'DESC' },
        take: query.take,
        skip: skip || 0,
      });
      return users;
    } catch (error) {
      return error;
    }
  }



  async findAll(query): Promise<User[]> {
    const date = new Date('2023-02-03');
    try {
      const skip = query.page === 1 ? 0 : (query.page - 1) * query.take;
      const users = await this.userRepository.find({
        where: { createDate: LessThan(date) },
        order: { record: 'DESC' },
        skip: skip || 0,
      });

      // const result = users.filter(
      //   (item, index) => index === users.map((el) => el.email).indexOf(item.email)).slice(0, 10);

      const test = await this.userRepository.query(
        `SELECT users.name, users.email, MAX(users.record) AS record
        FROM users
        WHERE record > 0 AND 'createDate' > '2023-02-01'
        GROUP BY users.email, users.name
        ORDER BY MAX(users.record) DESC
        LIMIT ${query.take || 10}
        OFFSET ${skip || 0}
        `
      )

      return test;
    } catch (error) {
      return error;
    }
  }

  async updateUser(email: string, options) {
    const result = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ ...options })
      .where('email = :email', { email: email })
      .returning('*')
      .execute();
    return result.raw[0];
  }

  async getBy({ key, value }): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where(`user.${key} = :${key}`, { [key]: value })
      .getOne();
  }
}

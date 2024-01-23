/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './Dtos/create-users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    try {
      const user_exist = await this.userRepository.findOne({
        where: { name: dto.name },
      });
      console.log('user_db', user_exist);
      if (user_exist) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'name already exist',
          },
          HttpStatus.CONFLICT,
        );
      }
      const user = this.userRepository.create(dto);
      return this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'user with name already exsist',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new NotFoundException('Error While Fetching Users list');
    }
  }

  async findone(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    console.log('user', user);
    if (!user) {
      console.log('user not found');
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with ID no ${id} not available`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async update(id: number, dto: CreateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      console.log(`user with ID #${id} not found`);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `user with ID #${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(user, dto);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with ID ${id} not available`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return this.userRepository.remove(user);
  }
}

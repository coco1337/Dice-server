import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { SearchUsersPaginateDto } from './dto/search-users-paginate-dto';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User) private usersRepository: Repository<User>
  ) { }

  get(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  getAll(searchUsersPaginateDto: SearchUsersPaginateDto): Promise<User[]> {
    return this.usersRepository.find({

      take: searchUsersPaginateDto.take,
      skip: searchUsersPaginateDto.skip,
    });
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

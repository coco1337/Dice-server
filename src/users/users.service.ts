import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { IsNull, Like, Repository } from 'typeorm';
import { SearchUsersPaginateDto } from './dto/search-users-paginate-dto';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  get(username: string): Promise<User> {
    return this.usersRepository.findOne({
      select: [
        'userId',
        'email',
        'uuid',
        'ip',
        'joinDate',
        'lastLogin',
      ],
      where: {userId: username},
    });
  }

  getAccount(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {userId: username},
    });
  }

  getAll(searchCriteria: SearchUsersPaginateDto): Promise<User[]> {
    return this.usersRepository.find({
      select: [
        'userId',
        'email',
        'uuid',
        'ip',
        'joinDate',
        'lastLogin',
      ],
      take: searchCriteria.take,
      skip: searchCriteria.skip,
    });
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

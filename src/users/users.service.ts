import { Injectable, Ip } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Equal, IsNull, Like, Repository } from 'typeorm';
import { SearchUsersPaginateDto } from './dto/search-users-paginate-dto';
import { UserRegisterDto } from './dto/user-register-dto';

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

  async addAccount(userInfo: UserRegisterDto, ip: string) {
    const newUser = this.usersRepository.create({
      userId: userInfo.username,
      password: userInfo.password,
      email: userInfo.email,
      joinDate: new Date(),
      ip: ip,
    });
    await this.usersRepository.save(newUser);
  }

  async delete(username: string): Promise<void> {
    await this.usersRepository
        .createQueryBuilder()
        .useTransaction(true)
        .delete()
        .from(User)
        .where('userId = :id', { id: username})
        .execute();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/user-register-dto';
import { randomUUID } from 'crypto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getAccount(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {userId: username},
    });
  }

  async addAccount(userInfo: UserRegisterDto, ip: string) {
    const newUser = this.usersRepository.create({
      userId: userInfo.username,
      password: await this.encryptPassword(userInfo.password),
      email: userInfo.email,
      joinDate: new Date(),
      ip: ip,
      uuid: randomUUID(),
    });
    await this.usersRepository.save(newUser);
  }

  async delete(payload): Promise<void> {
    await this.usersRepository
        .createQueryBuilder()
        .useTransaction(true)
        .delete()
        .from(User)
        .where('userId = :id', { id: payload.username})
        .execute();
  }

  async encryptPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }
}

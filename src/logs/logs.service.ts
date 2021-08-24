import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginLog } from './entities/login-log.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class LogsService {
  constructor(
      @InjectRepository(LoginLog)
      private loginLogRepository: Repository<LoginLog>,
      private usersService: UsersService,
  ) {}

  async loginLog(username: string) {
    const { userId, uuid } = await this.usersService.getAccount(username);
    const log = this.loginLogRepository.create({
      userId: userId,
      uuid: uuid,
      timestamp: new Date(),
    });

    await this.loginLogRepository.save(log);
  }
}

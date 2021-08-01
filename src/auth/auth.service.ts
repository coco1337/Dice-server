import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-dto';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
  ) {}

  async validateUser(userInfo: LoginDto): Promise<User> {
    const user = await this.usersService.getAccount(userInfo.username);

    if (user && user.password === userInfo.password) {
      const {password, ...result} = user;
      return result;
    }

    return null;
  }

  async login(userInfo: LoginDto): Promise<object> {
    const user = await this.validateUser(userInfo);

    if (!user) return null;

    const payload = {username: user.userId, sub: user.uuid};

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

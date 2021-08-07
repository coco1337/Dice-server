import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';
import { LogsService } from '../logs/logs.service';

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
  constructor(
      private authService: AuthService,
      private logsService: LogsService,
  ) {}

  @Post('/Login')
  async login(@Body() request: LoginDto) {
    const result = await this.authService.login(request);
    if (result == null) return new HttpException('Bad Credentials', HttpStatus.FORBIDDEN);

    await this.logsService.loginLog(request.username);
    return result;
  }
}

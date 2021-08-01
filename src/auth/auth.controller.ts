import {
  Controller,
  Post,
  Body,
  HttpException, HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
  constructor(
      private authService: AuthService,
  ) {}

  @Post('/Login')
  async login(@Body() request: LoginDto) {
    const result = await this.authService.login(request);
    if (result == null) return new HttpException('Bad Credentials', HttpStatus.FORBIDDEN);

    return result;
  }
}

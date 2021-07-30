import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
  constructor(
      private authService: AuthService
  ) {}

  @Post('/Login')
  async login(@Body() request: LoginDto) {
    return this.authService.login(request)
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
  Ip, Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchUsersPaginateDto } from './dto/search-users-paginate-dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRegisterDto } from './dto/user-register-dto';

@ApiTags('Users')
@Controller('Users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get('/Get/:username')
  public Get(@Param('username') username: string): Promise<User> {
    return this.usersService.get(username);
  }

  @Get('/GetAll')
  public GetAll(@Body() searchUsersPaginateDto: SearchUsersPaginateDto): Promise<User[]> {
    return this.usersService.getAll(searchUsersPaginateDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('Profile')
  getProfile(@Request() request) {
    return request.user;
  }

  @Post('/Register')
  public async register(@Body() userRegisterDto: UserRegisterDto, @Ip() ip) {
    return await this.usersService.addAccount(userRegisterDto, ip);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/UnRegister')
  public async unregister(@Request() request) {
    return await this.usersService.delete(request.user);
  }
}

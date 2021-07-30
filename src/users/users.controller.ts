import { Body, Controller, Get, Post, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchUsersPaginateDto } from './dto/search-users-paginate-dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('Users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get('/Get/:username')
  public Get(@Param('username') username: string): Promise<User> {
    return this.usersService.get(username);
  }

  @Post('/GetAll')
  public GetAll(@Body() searchUsersPaginateDto: SearchUsersPaginateDto): Promise<User[]> {
    return this.usersService.getAll(searchUsersPaginateDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('Profile')
  getProfile(@Request() request) {
    return request.user;
  }

}

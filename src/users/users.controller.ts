import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SearchUsersPaginateDto } from './dto/search-users-paginate-dto';

@ApiTags('Users')
@Controller('Users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get(':username')
  public Get(@Param('username') username: string): Promise<User> {
    return this.usersService.get(username);
  }

  @Post()
  public GetAll(@Body() searchUsersPaginateDto: SearchUsersPaginateDto): Promise<User[]> {
    return this.usersService.getAll(searchUsersPaginateDto);
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { ApiTags } from '@nestjs/swagger';
import { SearchUsersPaginateDto } from './dto/search-users-paginate-dto';

@ApiTags('Users')
@Controller('Users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get('{id}')
  public Get(id: string): Promise<User> {
    return this.usersService.get(id);
  }

  @Post()
  public GetAll(@Body() searchUsersPaginateDto: SearchUsersPaginateDto): Promise<User[]> {
    return this.usersService.getAll(searchUsersPaginateDto);
  }
}

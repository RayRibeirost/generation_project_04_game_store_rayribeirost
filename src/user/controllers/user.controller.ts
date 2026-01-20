import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { Users } from '../entities/user.entity';

@Controller('/usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  findAllUsers(): Promise<Users[]> {
    return this.usersService.findAllUsers();
  }
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findUserById(@Param('id') id: string): Promise<Users> {
    return this.usersService.findUserById(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: Users): Promise<Users> {
    return this.usersService.createUser(user);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  updateUser(@Body() user: Users): Promise<Users> {
    return this.usersService.updateUser(user);
  }
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}

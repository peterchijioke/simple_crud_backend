import { Body, Controller, Post, Put, Delete, Get, Param, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('/')
  async createUser(@Body() user: CreateUserDto) {
    const createdUser = await this.userService.createUser(user);
    return {
      status: HttpStatus.CREATED,
      message: 'User created successfully',
      data: createdUser,
    };
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() user: CreateUserDto) {
    const updatedUser = await this.userService.updateUser(id, user);
    return {
      status: HttpStatus.OK,
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return {
      status: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }

  @Get('/')
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return {
      status: HttpStatus.OK,
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return {
      status: HttpStatus.OK,
      message: 'User retrieved successfully',
      data: user,
    };
  }
}
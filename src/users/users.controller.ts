import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UsersService) {} 
  @Post('/')
  async createUser(@Body() user: CreateUserDto) {
    try {
      const createdUser = await this.userService.createUser(user);
      return {
        status: HttpStatus.CREATED,
        message: 'User created successfully',
        data: createdUser,
      };
    } catch (error) {
      if (error.code === '23505') { 
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'A user with this email already exists.',
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem creating the user.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
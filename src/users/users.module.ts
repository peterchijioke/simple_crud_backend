import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { User } from '../repository/user.entity';
import { UserContact } from '../repository/user-contact.entity';
import { UserAddress } from 'src/repository/user-address.entity';
import { AcademicBackground } from 'src/repository/academic-background.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserContact,UserAddress,AcademicBackground])], 
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
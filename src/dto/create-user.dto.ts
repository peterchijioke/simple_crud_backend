import { IsString, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';
import { CreateUserAddressDto } from './create-user-address.dto';
import { CreateUserContactDto } from './create-user-contact.dto';
import { CreateAcademicBackgroundDto } from './create-user-academic-background.dto';



export class CreateUserDto {
  @IsString()
  @IsOptional()
  profilePhoto?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsString()
  @IsNotEmpty()
  occupation: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  contact: CreateUserContactDto;

  @IsNotEmpty()
  address: CreateUserAddressDto;

  @IsNotEmpty()
  academicBackgrounds: CreateAcademicBackgroundDto[];
}
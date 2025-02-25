import { IsString, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  dob: string; 

  @IsNotEmpty()
  @IsString()
  occupation: string;

  @IsNotEmpty()
  @IsString()
  gender: string;
}
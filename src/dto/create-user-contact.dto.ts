import { IsString, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserContactDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  fax?: string;

  @IsString()
  @IsOptional()
  linkedInUrl?: string;
}

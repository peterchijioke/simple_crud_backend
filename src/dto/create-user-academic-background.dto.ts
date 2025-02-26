import { IsString, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';


export class CreateAcademicBackgroundDto {
  @IsString()
  @IsNotEmpty()
  schoolName: string;

  @IsString()
  @IsOptional()
  degree?: string;

  @IsString()
  @IsOptional()
  fieldOfStudy?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}

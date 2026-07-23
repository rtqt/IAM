import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { InternshipTrack } from '@prisma/client';

export class CreateApplicantDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(InternshipTrack)
  @IsNotEmpty()
  track!: InternshipTrack;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  notes?: string;
}

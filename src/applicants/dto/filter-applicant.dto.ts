import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApplicantStatus, InternshipTrack } from '@prisma/client';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum ApplicantSortField {
  CREATED_AT = 'createdAt',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  STATUS = 'status',
  TRACK = 'track',
}

export class FilterApplicantDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(ApplicantStatus)
  status?: ApplicantStatus;

  @IsOptional()
  @IsEnum(InternshipTrack)
  track?: InternshipTrack;

  @IsOptional()
  @IsEnum(ApplicantSortField)
  sortBy?: ApplicantSortField = ApplicantSortField.CREATED_AT;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;
}

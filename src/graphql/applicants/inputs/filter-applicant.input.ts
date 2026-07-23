import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApplicantStatus, InternshipTrack } from '@prisma/client';
import { registerEnumType } from '@nestjs/graphql';

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

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

registerEnumType(ApplicantSortField, {
  name: 'ApplicantSortField',
});

@InputType()
export class FilterApplicantInput {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  search?: string;

  @Field(() => ApplicantStatus, { nullable: true })
  @IsEnum(ApplicantStatus)
  @IsOptional()
  status?: ApplicantStatus;

  @Field(() => InternshipTrack, { nullable: true })
  @IsEnum(InternshipTrack)
  @IsOptional()
  track?: InternshipTrack;

  @Field(() => ApplicantSortField, { nullable: true, defaultValue: ApplicantSortField.CREATED_AT })
  @IsEnum(ApplicantSortField)
  @IsOptional()
  sortBy?: ApplicantSortField = ApplicantSortField.CREATED_AT;

  @Field(() => SortOrder, { nullable: true, defaultValue: SortOrder.DESC })
  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder?: SortOrder = SortOrder.DESC;
}

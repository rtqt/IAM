import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { InternshipTrack } from '@prisma/client';

@InputType()
export class CreateApplicantInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  phone?: string;

  @Field(() => InternshipTrack)
  @IsEnum(InternshipTrack)
  @IsNotEmpty()
  track!: InternshipTrack;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  notes?: string;
}

import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApplicantStatus } from '@prisma/client';

export class UpdateStatusDto {
  @IsEnum(ApplicantStatus)
  @IsNotEmpty()
  status!: ApplicantStatus;
}

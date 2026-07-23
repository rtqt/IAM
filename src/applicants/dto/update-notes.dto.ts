import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateNotesDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  notes!: string;
}

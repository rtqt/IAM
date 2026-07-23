import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ApplicantsService } from './applicants.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { FilterApplicantDto } from './dto/filter-applicant.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Applicants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('applicants')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Post()
  create(@Body() createApplicantDto: CreateApplicantDto) {
    return this.applicantsService.create(createApplicantDto);
  }

  @Get()
  findAll(@Query() filterDto: FilterApplicantDto) {
    return this.applicantsService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicantsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicantDto: UpdateApplicantDto) {
    return this.applicantsService.update(id, updateApplicantDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.applicantsService.updateStatus(id, updateStatusDto.status);
  }

  @Patch(':id/notes')
  updateNotes(@Param('id') id: string, @Body() updateNotesDto: UpdateNotesDto) {
    return this.applicantsService.updateNotes(id, updateNotesDto.notes);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicantsService.remove(id);
  }
}

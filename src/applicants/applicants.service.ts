import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { FilterApplicantDto } from './dto/filter-applicant.dto';
import { ApplicantStatus } from '@prisma/client';

@Injectable()
export class ApplicantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createApplicantDto: CreateApplicantDto) {
    const existing = await this.prisma.applicant.findUnique({
      where: { email: createApplicantDto.email },
    });
    if (existing) {
      throw new ConflictException('Applicant with this email already exists');
    }

    return this.prisma.applicant.create({
      data: createApplicantDto,
    });
  }

  async findAll(filterDto: FilterApplicantDto) {
    const { page = 1, limit = 10, search, status, track, sortBy = 'createdAt', sortOrder = 'desc' } = filterDto;
    const skip = (page - 1) * limit;

    const where: any = { deletedAt: null };

    if (status) where.status = status;
    if (track) where.track = track;
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, totalItems] = await Promise.all([
      this.prisma.applicant.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.applicant.count({ where }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      meta: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async findOne(id: string) {
    const applicant = await this.prisma.applicant.findFirst({
      where: { id, deletedAt: null },
    });

    if (!applicant) {
      throw new NotFoundException('Applicant not found');
    }

    return applicant;
  }

  async update(id: string, updateApplicantDto: UpdateApplicantDto) {
    await this.findOne(id);
    
    if (updateApplicantDto.email) {
      const existing = await this.prisma.applicant.findUnique({
        where: { email: updateApplicantDto.email },
      });
      if (existing && existing.id !== id) {
        throw new ConflictException('Applicant with this email already exists');
      }
    }

    return this.prisma.applicant.update({
      where: { id },
      data: updateApplicantDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.applicant.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async updateStatus(id: string, status: ApplicantStatus) {
    const applicant = await this.findOne(id);

    if (applicant.status === 'REJECTED' && status === 'ACCEPTED') {
      throw new BadRequestException('Cannot transition directly from REJECTED to ACCEPTED');
    }

    return this.prisma.applicant.update({
      where: { id },
      data: { status },
    });
  }

  async updateNotes(id: string, notes: string) {
    await this.findOne(id);
    return this.prisma.applicant.update({
      where: { id },
      data: { notes },
    });
  }
}

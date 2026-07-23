import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicantStatus, InternshipTrack } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary() {
    const activeApplicants = await this.prisma.applicant.count({
      where: { deletedAt: null },
    });

    const byStatusRaw = await this.prisma.applicant.groupBy({
      by: ['status'],
      where: { deletedAt: null },
      _count: { status: true },
    });

    const byTrackRaw = await this.prisma.applicant.groupBy({
      by: ['track'],
      where: { deletedAt: null },
      _count: { track: true },
    });

    // Ensure all enum values are present in the response
    const byStatus = Object.values(ApplicantStatus).reduce((acc, status) => {
      const match = byStatusRaw.find((item) => item.status === status);
      acc[status] = match ? match._count.status : 0;
      return acc;
    }, {} as Record<string, number>);

    const byTrack = Object.values(InternshipTrack).reduce((acc, track) => {
      const match = byTrackRaw.find((item) => item.track === track);
      acc[track] = match ? match._count.track : 0;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalActiveApplicants: activeApplicants,
      byStatus,
      byTrack,
    };
  }
}

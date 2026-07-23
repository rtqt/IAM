import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DashboardService } from '../../dashboard/dashboard.service';
import { DashboardSummary } from './types/dashboard-summary.type';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver()
@UseGuards(GqlAuthGuard)
export class DashboardResolver {
  constructor(private readonly dashboardService: DashboardService) {}

  @Query(() => DashboardSummary)
  async dashboardSummary() {
    const rawSummary = await this.dashboardService.getSummary();

    const byStatus = Object.entries(rawSummary.byStatus).map(
      ([status, count]) => ({ status, count: count as number }),
    );

    const byTrack = Object.entries(rawSummary.byTrack).map(([track, count]) => ({
      track,
      count: count as number,
    }));

    return {
      totalActiveApplicants: rawSummary.totalActiveApplicants,
      byStatus,
      byTrack,
    };
  }
}

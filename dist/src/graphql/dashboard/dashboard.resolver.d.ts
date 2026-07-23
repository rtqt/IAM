import { DashboardService } from '../../dashboard/dashboard.service';
export declare class DashboardResolver {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    dashboardSummary(): Promise<{
        totalActiveApplicants: number;
        byStatus: {
            status: string;
            count: number;
        }[];
        byTrack: {
            track: string;
            count: number;
        }[];
    }>;
}

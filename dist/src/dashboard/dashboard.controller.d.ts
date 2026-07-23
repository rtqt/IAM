import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getSummary(): Promise<{
        totalActiveApplicants: number;
        byStatus: Record<string, number>;
        byTrack: Record<string, number>;
    }>;
}

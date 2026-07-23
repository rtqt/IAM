import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSummary(): Promise<{
        totalActiveApplicants: number;
        byStatus: Record<string, number>;
        byTrack: Record<string, number>;
    }>;
}

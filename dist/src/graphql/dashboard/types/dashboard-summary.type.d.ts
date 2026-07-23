export declare class StatusCount {
    status: string;
    count: number;
}
export declare class TrackCount {
    track: string;
    count: number;
}
export declare class DashboardSummary {
    totalActiveApplicants: number;
    byStatus: StatusCount[];
    byTrack: TrackCount[];
}

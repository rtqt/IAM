import { ApplicantStatus, InternshipTrack } from '@prisma/client';
export declare enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}
export declare enum ApplicantSortField {
    CREATED_AT = "createdAt",
    FIRST_NAME = "firstName",
    LAST_NAME = "lastName",
    STATUS = "status",
    TRACK = "track"
}
export declare class FilterApplicantDto {
    page?: number;
    limit?: number;
    search?: string;
    status?: ApplicantStatus;
    track?: InternshipTrack;
    sortBy?: ApplicantSortField;
    sortOrder?: SortOrder;
}

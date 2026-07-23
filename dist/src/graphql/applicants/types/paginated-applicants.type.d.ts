import { ApplicantType } from './applicant.type';
export declare class ApplicantMeta {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export declare class PaginatedApplicants {
    data: ApplicantType[];
    meta: ApplicantMeta;
}

import { ApplicantsService } from '../../applicants/applicants.service';
import { CreateApplicantInput } from './inputs/create-applicant.input';
import { UpdateApplicantInput } from './inputs/update-applicant.input';
import { FilterApplicantInput } from './inputs/filter-applicant.input';
import { ApplicantStatus } from '@prisma/client';
export declare class ApplicantsResolver {
    private readonly applicantsService;
    constructor(applicantsService: ApplicantsService);
    applicants(filter?: FilterApplicantInput): Promise<{
        data: {
            id: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            firstName: string;
            lastName: string;
            phone: string | null;
            track: import("@prisma/client").$Enums.InternshipTrack;
            notes: string | null;
            status: import("@prisma/client").$Enums.ApplicantStatus;
            deletedAt: Date | null;
        }[];
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    applicant(id: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        phone: string | null;
        track: import("@prisma/client").$Enums.InternshipTrack;
        notes: string | null;
        status: import("@prisma/client").$Enums.ApplicantStatus;
        deletedAt: Date | null;
    }>;
    createApplicant(input: CreateApplicantInput): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        phone: string | null;
        track: import("@prisma/client").$Enums.InternshipTrack;
        notes: string | null;
        status: import("@prisma/client").$Enums.ApplicantStatus;
        deletedAt: Date | null;
    }>;
    updateApplicant(id: string, input: UpdateApplicantInput): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        phone: string | null;
        track: import("@prisma/client").$Enums.InternshipTrack;
        notes: string | null;
        status: import("@prisma/client").$Enums.ApplicantStatus;
        deletedAt: Date | null;
    }>;
    deleteApplicant(id: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        phone: string | null;
        track: import("@prisma/client").$Enums.InternshipTrack;
        notes: string | null;
        status: import("@prisma/client").$Enums.ApplicantStatus;
        deletedAt: Date | null;
    }>;
    updateApplicantStatus(id: string, status: ApplicantStatus): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        phone: string | null;
        track: import("@prisma/client").$Enums.InternshipTrack;
        notes: string | null;
        status: import("@prisma/client").$Enums.ApplicantStatus;
        deletedAt: Date | null;
    }>;
    updateApplicantNotes(id: string, notes: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        phone: string | null;
        track: import("@prisma/client").$Enums.InternshipTrack;
        notes: string | null;
        status: import("@prisma/client").$Enums.ApplicantStatus;
        deletedAt: Date | null;
    }>;
}

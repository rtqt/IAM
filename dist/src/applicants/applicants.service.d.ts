import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { FilterApplicantDto } from './dto/filter-applicant.dto';
import { ApplicantStatus } from '@prisma/client';
export declare class ApplicantsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createApplicantDto: CreateApplicantDto): Promise<{
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
    findAll(filterDto: FilterApplicantDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateApplicantDto: UpdateApplicantDto): Promise<{
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
    remove(id: string): Promise<{
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
    updateStatus(id: string, status: ApplicantStatus): Promise<{
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
    updateNotes(id: string, notes: string): Promise<{
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

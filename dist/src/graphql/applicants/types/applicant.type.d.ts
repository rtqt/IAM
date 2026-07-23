import { ApplicantStatus, InternshipTrack } from '@prisma/client';
export declare class ApplicantType {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    track: InternshipTrack;
    status: ApplicantStatus;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

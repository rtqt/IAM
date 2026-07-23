import { InternshipTrack } from '@prisma/client';
export declare class CreateApplicantInput {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    track: InternshipTrack;
    notes?: string;
}

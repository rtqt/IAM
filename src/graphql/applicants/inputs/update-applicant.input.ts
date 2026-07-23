import { InputType, PartialType } from '@nestjs/graphql';
import { CreateApplicantInput } from './create-applicant.input';

@InputType()
export class UpdateApplicantInput extends PartialType(CreateApplicantInput) {}

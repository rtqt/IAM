import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApplicantType } from './applicant.type';

@ObjectType()
export class ApplicantMeta {
  @Field(() => Int)
  page!: number;

  @Field(() => Int)
  limit!: number;

  @Field(() => Int)
  totalItems!: number;

  @Field(() => Int)
  totalPages!: number;

  @Field()
  hasNextPage!: boolean;

  @Field()
  hasPreviousPage!: boolean;
}

@ObjectType()
export class PaginatedApplicants {
  @Field(() => [ApplicantType])
  data!: ApplicantType[];

  @Field(() => ApplicantMeta)
  meta!: ApplicantMeta;
}

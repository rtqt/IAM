import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ApplicantsService } from '../../applicants/applicants.service';
import { ApplicantType } from './types/applicant.type';
import { PaginatedApplicants } from './types/paginated-applicants.type';
import { CreateApplicantInput } from './inputs/create-applicant.input';
import { UpdateApplicantInput } from './inputs/update-applicant.input';
import { FilterApplicantInput } from './inputs/filter-applicant.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { ApplicantStatus } from '@prisma/client';

@Resolver(() => ApplicantType)
@UseGuards(GqlAuthGuard)
export class ApplicantsResolver {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Query(() => PaginatedApplicants)
  async applicants(
    @Args('filter', { nullable: true }) filter?: FilterApplicantInput,
  ) {
    return this.applicantsService.findAll(filter || new FilterApplicantInput());
  }

  @Query(() => ApplicantType)
  async applicant(@Args('id', { type: () => ID }) id: string) {
    return this.applicantsService.findOne(id);
  }

  @Mutation(() => ApplicantType)
  async createApplicant(@Args('input') input: CreateApplicantInput) {
    return this.applicantsService.create(input);
  }

  @Mutation(() => ApplicantType)
  async updateApplicant(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateApplicantInput,
  ) {
    return this.applicantsService.update(id, input);
  }

  @Mutation(() => ApplicantType)
  async deleteApplicant(@Args('id', { type: () => ID }) id: string) {
    return this.applicantsService.remove(id);
  }

  @Mutation(() => ApplicantType)
  async updateApplicantStatus(
    @Args('id', { type: () => ID }) id: string,
    @Args('status', { type: () => ApplicantStatus }) status: ApplicantStatus,
  ) {
    return this.applicantsService.updateStatus(id, status);
  }

  @Mutation(() => ApplicantType)
  async updateApplicantNotes(
    @Args('id', { type: () => ID }) id: string,
    @Args('notes') notes: string,
  ) {
    return this.applicantsService.updateNotes(id, notes);
  }
}

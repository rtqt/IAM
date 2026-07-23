import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApplicantStatus, InternshipTrack } from '@prisma/client';

registerEnumType(ApplicantStatus, {
  name: 'ApplicantStatus',
});

registerEnumType(InternshipTrack, {
  name: 'InternshipTrack',
});

@ObjectType()
export class ApplicantType {
  @Field(() => ID)
  id!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => InternshipTrack)
  track!: InternshipTrack;

  @Field(() => ApplicantStatus)
  status!: ApplicantStatus;

  @Field({ nullable: true })
  notes?: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

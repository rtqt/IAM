import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatusCount {
  @Field()
  status!: string;

  @Field(() => Int)
  count!: number;
}

@ObjectType()
export class TrackCount {
  @Field()
  track!: string;

  @Field(() => Int)
  count!: number;
}

@ObjectType()
export class DashboardSummary {
  @Field(() => Int)
  totalActiveApplicants!: number;

  @Field(() => [StatusCount])
  byStatus!: StatusCount[];

  @Field(() => [TrackCount])
  byTrack!: TrackCount[];
}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthResolver } from './auth/auth.resolver';
import { ApplicantsResolver } from './applicants/applicants.resolver';
import { DashboardResolver } from './dashboard/dashboard.resolver';
import { AuthModule } from '../auth/auth.module';
import { ApplicantsModule } from '../applicants/applicants.module';
import { DashboardModule } from '../dashboard/dashboard.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      context: ({ req }) => ({ req }),
      playground: true, // using playground for manual verification instead of Apollo Studio, it is easier locally. Or use apollo studio: default is true anyway if no apollo key
    }),
    AuthModule,
    ApplicantsModule,
    DashboardModule,
  ],
  providers: [AuthResolver, ApplicantsResolver, DashboardResolver],
})
export class GraphqlRootModule {}

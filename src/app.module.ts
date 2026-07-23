import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ApplicantsModule } from './applicants/applicants.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GraphqlRootModule } from './graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    ApplicantsModule,
    DashboardModule,
    GraphqlRootModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

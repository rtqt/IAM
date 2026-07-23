"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlRootModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const auth_resolver_1 = require("./auth/auth.resolver");
const applicants_resolver_1 = require("./applicants/applicants.resolver");
const dashboard_resolver_1 = require("./dashboard/dashboard.resolver");
const auth_module_1 = require("../auth/auth.module");
const applicants_module_1 = require("../applicants/applicants.module");
const dashboard_module_1 = require("../dashboard/dashboard.module");
let GraphqlRootModule = class GraphqlRootModule {
};
exports.GraphqlRootModule = GraphqlRootModule;
exports.GraphqlRootModule = GraphqlRootModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'schema.gql'),
                context: ({ req }) => ({ req }),
                playground: true,
            }),
            auth_module_1.AuthModule,
            applicants_module_1.ApplicantsModule,
            dashboard_module_1.DashboardModule,
        ],
        providers: [auth_resolver_1.AuthResolver, applicants_resolver_1.ApplicantsResolver, dashboard_resolver_1.DashboardResolver],
    })
], GraphqlRootModule);
//# sourceMappingURL=graphql.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("../../dashboard/dashboard.service");
const dashboard_summary_type_1 = require("./types/dashboard-summary.type");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
let DashboardResolver = class DashboardResolver {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async dashboardSummary() {
        const rawSummary = await this.dashboardService.getSummary();
        const byStatus = Object.entries(rawSummary.byStatus).map(([status, count]) => ({ status, count: count }));
        const byTrack = Object.entries(rawSummary.byTrack).map(([track, count]) => ({
            track,
            count: count,
        }));
        return {
            totalActiveApplicants: rawSummary.totalActiveApplicants,
            byStatus,
            byTrack,
        };
    }
};
exports.DashboardResolver = DashboardResolver;
__decorate([
    (0, graphql_1.Query)(() => dashboard_summary_type_1.DashboardSummary),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "dashboardSummary", null);
exports.DashboardResolver = DashboardResolver = __decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardResolver);
//# sourceMappingURL=dashboard.resolver.js.map
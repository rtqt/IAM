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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const applicants_service_1 = require("../../applicants/applicants.service");
const applicant_type_1 = require("./types/applicant.type");
const paginated_applicants_type_1 = require("./types/paginated-applicants.type");
const create_applicant_input_1 = require("./inputs/create-applicant.input");
const update_applicant_input_1 = require("./inputs/update-applicant.input");
const filter_applicant_input_1 = require("./inputs/filter-applicant.input");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
const client_1 = require("@prisma/client");
let ApplicantsResolver = class ApplicantsResolver {
    applicantsService;
    constructor(applicantsService) {
        this.applicantsService = applicantsService;
    }
    async applicants(filter) {
        return this.applicantsService.findAll(filter || new filter_applicant_input_1.FilterApplicantInput());
    }
    async applicant(id) {
        return this.applicantsService.findOne(id);
    }
    async createApplicant(input) {
        return this.applicantsService.create(input);
    }
    async updateApplicant(id, input) {
        return this.applicantsService.update(id, input);
    }
    async deleteApplicant(id) {
        return this.applicantsService.remove(id);
    }
    async updateApplicantStatus(id, status) {
        return this.applicantsService.updateStatus(id, status);
    }
    async updateApplicantNotes(id, notes) {
        return this.applicantsService.updateNotes(id, notes);
    }
};
exports.ApplicantsResolver = ApplicantsResolver;
__decorate([
    (0, graphql_1.Query)(() => paginated_applicants_type_1.PaginatedApplicants),
    __param(0, (0, graphql_1.Args)('filter', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_applicant_input_1.FilterApplicantInput]),
    __metadata("design:returntype", Promise)
], ApplicantsResolver.prototype, "applicants", null);
__decorate([
    (0, graphql_1.Query)(() => applicant_type_1.ApplicantType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicantsResolver.prototype, "applicant", null);
__decorate([
    (0, graphql_1.Mutation)(() => applicant_type_1.ApplicantType),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_applicant_input_1.CreateApplicantInput]),
    __metadata("design:returntype", Promise)
], ApplicantsResolver.prototype, "createApplicant", null);
__decorate([
    (0, graphql_1.Mutation)(() => applicant_type_1.ApplicantType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_applicant_input_1.UpdateApplicantInput]),
    __metadata("design:returntype", Promise)
], ApplicantsResolver.prototype, "updateApplicant", null);
__decorate([
    (0, graphql_1.Mutation)(() => applicant_type_1.ApplicantType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicantsResolver.prototype, "deleteApplicant", null);
__decorate([
    (0, graphql_1.Mutation)(() => applicant_type_1.ApplicantType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('status', { type: () => client_1.ApplicantStatus })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ApplicantsResolver.prototype, "updateApplicantStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => applicant_type_1.ApplicantType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('notes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ApplicantsResolver.prototype, "updateApplicantNotes", null);
exports.ApplicantsResolver = ApplicantsResolver = __decorate([
    (0, graphql_1.Resolver)(() => applicant_type_1.ApplicantType),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [applicants_service_1.ApplicantsService])
], ApplicantsResolver);
//# sourceMappingURL=applicants.resolver.js.map
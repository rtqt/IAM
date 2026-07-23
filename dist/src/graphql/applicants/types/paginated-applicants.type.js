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
exports.PaginatedApplicants = exports.ApplicantMeta = void 0;
const graphql_1 = require("@nestjs/graphql");
const applicant_type_1 = require("./applicant.type");
let ApplicantMeta = class ApplicantMeta {
    page;
    limit;
    totalItems;
    totalPages;
    hasNextPage;
    hasPreviousPage;
};
exports.ApplicantMeta = ApplicantMeta;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ApplicantMeta.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ApplicantMeta.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ApplicantMeta.prototype, "totalItems", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ApplicantMeta.prototype, "totalPages", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ApplicantMeta.prototype, "hasNextPage", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ApplicantMeta.prototype, "hasPreviousPage", void 0);
exports.ApplicantMeta = ApplicantMeta = __decorate([
    (0, graphql_1.ObjectType)()
], ApplicantMeta);
let PaginatedApplicants = class PaginatedApplicants {
    data;
    meta;
};
exports.PaginatedApplicants = PaginatedApplicants;
__decorate([
    (0, graphql_1.Field)(() => [applicant_type_1.ApplicantType]),
    __metadata("design:type", Array)
], PaginatedApplicants.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => ApplicantMeta),
    __metadata("design:type", ApplicantMeta)
], PaginatedApplicants.prototype, "meta", void 0);
exports.PaginatedApplicants = PaginatedApplicants = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedApplicants);
//# sourceMappingURL=paginated-applicants.type.js.map
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
exports.FilterApplicantInput = exports.ApplicantSortField = exports.SortOrder = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
const graphql_2 = require("@nestjs/graphql");
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "asc";
    SortOrder["DESC"] = "desc";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
var ApplicantSortField;
(function (ApplicantSortField) {
    ApplicantSortField["CREATED_AT"] = "createdAt";
    ApplicantSortField["FIRST_NAME"] = "firstName";
    ApplicantSortField["LAST_NAME"] = "lastName";
    ApplicantSortField["STATUS"] = "status";
    ApplicantSortField["TRACK"] = "track";
})(ApplicantSortField || (exports.ApplicantSortField = ApplicantSortField = {}));
(0, graphql_2.registerEnumType)(SortOrder, {
    name: 'SortOrder',
});
(0, graphql_2.registerEnumType)(ApplicantSortField, {
    name: 'ApplicantSortField',
});
let FilterApplicantInput = class FilterApplicantInput {
    page = 1;
    limit = 10;
    search;
    status;
    track;
    sortBy = ApplicantSortField.CREATED_AT;
    sortOrder = SortOrder.DESC;
};
exports.FilterApplicantInput = FilterApplicantInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true, defaultValue: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterApplicantInput.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true, defaultValue: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterApplicantInput.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterApplicantInput.prototype, "search", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.ApplicantStatus, { nullable: true }),
    (0, class_validator_1.IsEnum)(client_1.ApplicantStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterApplicantInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.InternshipTrack, { nullable: true }),
    (0, class_validator_1.IsEnum)(client_1.InternshipTrack),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterApplicantInput.prototype, "track", void 0);
__decorate([
    (0, graphql_1.Field)(() => ApplicantSortField, { nullable: true, defaultValue: ApplicantSortField.CREATED_AT }),
    (0, class_validator_1.IsEnum)(ApplicantSortField),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterApplicantInput.prototype, "sortBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => SortOrder, { nullable: true, defaultValue: SortOrder.DESC }),
    (0, class_validator_1.IsEnum)(SortOrder),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterApplicantInput.prototype, "sortOrder", void 0);
exports.FilterApplicantInput = FilterApplicantInput = __decorate([
    (0, graphql_1.InputType)()
], FilterApplicantInput);
//# sourceMappingURL=filter-applicant.input.js.map
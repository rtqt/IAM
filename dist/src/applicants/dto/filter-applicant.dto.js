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
exports.FilterApplicantDto = exports.ApplicantSortField = exports.SortOrder = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
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
class FilterApplicantDto {
    page = 1;
    limit = 10;
    search;
    status;
    track;
    sortBy = ApplicantSortField.CREATED_AT;
    sortOrder = SortOrder.DESC;
}
exports.FilterApplicantDto = FilterApplicantDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], FilterApplicantDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], FilterApplicantDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterApplicantDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.ApplicantStatus),
    __metadata("design:type", String)
], FilterApplicantDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.InternshipTrack),
    __metadata("design:type", String)
], FilterApplicantDto.prototype, "track", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ApplicantSortField),
    __metadata("design:type", String)
], FilterApplicantDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortOrder),
    __metadata("design:type", String)
], FilterApplicantDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=filter-applicant.dto.js.map
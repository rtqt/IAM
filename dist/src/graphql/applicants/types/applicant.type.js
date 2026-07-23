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
exports.ApplicantType = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
(0, graphql_1.registerEnumType)(client_1.ApplicantStatus, {
    name: 'ApplicantStatus',
});
(0, graphql_1.registerEnumType)(client_1.InternshipTrack, {
    name: 'InternshipTrack',
});
let ApplicantType = class ApplicantType {
    id;
    firstName;
    lastName;
    email;
    phone;
    track;
    status;
    notes;
    createdAt;
    updatedAt;
};
exports.ApplicantType = ApplicantType;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], ApplicantType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ApplicantType.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ApplicantType.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ApplicantType.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ApplicantType.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.InternshipTrack),
    __metadata("design:type", String)
], ApplicantType.prototype, "track", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.ApplicantStatus),
    __metadata("design:type", String)
], ApplicantType.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ApplicantType.prototype, "notes", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], ApplicantType.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], ApplicantType.prototype, "updatedAt", void 0);
exports.ApplicantType = ApplicantType = __decorate([
    (0, graphql_1.ObjectType)()
], ApplicantType);
//# sourceMappingURL=applicant.type.js.map
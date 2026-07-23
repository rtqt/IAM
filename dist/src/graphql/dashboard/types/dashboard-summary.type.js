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
exports.DashboardSummary = exports.TrackCount = exports.StatusCount = void 0;
const graphql_1 = require("@nestjs/graphql");
let StatusCount = class StatusCount {
    status;
    count;
};
exports.StatusCount = StatusCount;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], StatusCount.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], StatusCount.prototype, "count", void 0);
exports.StatusCount = StatusCount = __decorate([
    (0, graphql_1.ObjectType)()
], StatusCount);
let TrackCount = class TrackCount {
    track;
    count;
};
exports.TrackCount = TrackCount;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TrackCount.prototype, "track", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], TrackCount.prototype, "count", void 0);
exports.TrackCount = TrackCount = __decorate([
    (0, graphql_1.ObjectType)()
], TrackCount);
let DashboardSummary = class DashboardSummary {
    totalActiveApplicants;
    byStatus;
    byTrack;
};
exports.DashboardSummary = DashboardSummary;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DashboardSummary.prototype, "totalActiveApplicants", void 0);
__decorate([
    (0, graphql_1.Field)(() => [StatusCount]),
    __metadata("design:type", Array)
], DashboardSummary.prototype, "byStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => [TrackCount]),
    __metadata("design:type", Array)
], DashboardSummary.prototype, "byTrack", void 0);
exports.DashboardSummary = DashboardSummary = __decorate([
    (0, graphql_1.ObjectType)()
], DashboardSummary);
//# sourceMappingURL=dashboard-summary.type.js.map
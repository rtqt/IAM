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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSummary() {
        const activeApplicants = await this.prisma.applicant.count({
            where: { deletedAt: null },
        });
        const byStatusRaw = await this.prisma.applicant.groupBy({
            by: ['status'],
            where: { deletedAt: null },
            _count: { status: true },
        });
        const byTrackRaw = await this.prisma.applicant.groupBy({
            by: ['track'],
            where: { deletedAt: null },
            _count: { track: true },
        });
        const byStatus = Object.values(client_1.ApplicantStatus).reduce((acc, status) => {
            const match = byStatusRaw.find((item) => item.status === status);
            acc[status] = match ? match._count.status : 0;
            return acc;
        }, {});
        const byTrack = Object.values(client_1.InternshipTrack).reduce((acc, track) => {
            const match = byTrackRaw.find((item) => item.track === track);
            acc[track] = match ? match._count.track : 0;
            return acc;
        }, {});
        return {
            totalActiveApplicants: activeApplicants,
            byStatus,
            byTrack,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map
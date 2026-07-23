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
exports.ApplicantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ApplicantsService = class ApplicantsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createApplicantDto) {
        const existing = await this.prisma.applicant.findUnique({
            where: { email: createApplicantDto.email },
        });
        if (existing) {
            throw new common_1.ConflictException('Applicant with this email already exists');
        }
        return this.prisma.applicant.create({
            data: createApplicantDto,
        });
    }
    async findAll(filterDto) {
        const { page = 1, limit = 10, search, status, track, sortBy = 'createdAt', sortOrder = 'desc' } = filterDto;
        const skip = (page - 1) * limit;
        const where = { deletedAt: null };
        if (status)
            where.status = status;
        if (track)
            where.track = track;
        if (search) {
            where.OR = [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [data, totalItems] = await Promise.all([
            this.prisma.applicant.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
            this.prisma.applicant.count({ where }),
        ]);
        const totalPages = Math.ceil(totalItems / limit);
        return {
            data,
            meta: {
                page,
                limit,
                totalItems,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }
    async findOne(id) {
        const applicant = await this.prisma.applicant.findFirst({
            where: { id, deletedAt: null },
        });
        if (!applicant) {
            throw new common_1.NotFoundException('Applicant not found');
        }
        return applicant;
    }
    async update(id, updateApplicantDto) {
        await this.findOne(id);
        if (updateApplicantDto.email) {
            const existing = await this.prisma.applicant.findUnique({
                where: { email: updateApplicantDto.email },
            });
            if (existing && existing.id !== id) {
                throw new common_1.ConflictException('Applicant with this email already exists');
            }
        }
        return this.prisma.applicant.update({
            where: { id },
            data: updateApplicantDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.applicant.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async updateStatus(id, status) {
        const applicant = await this.findOne(id);
        if (applicant.status === 'REJECTED' && status === 'ACCEPTED') {
            throw new common_1.BadRequestException('Cannot transition directly from REJECTED to ACCEPTED');
        }
        return this.prisma.applicant.update({
            where: { id },
            data: { status },
        });
    }
    async updateNotes(id, notes) {
        await this.findOne(id);
        return this.prisma.applicant.update({
            where: { id },
            data: { notes },
        });
    }
};
exports.ApplicantsService = ApplicantsService;
exports.ApplicantsService = ApplicantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicantsService);
//# sourceMappingURL=applicants.service.js.map
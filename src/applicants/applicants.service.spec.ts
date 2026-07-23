import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantsService } from './applicants.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InternshipTrack, ApplicantStatus } from '@prisma/client';

describe('ApplicantsService', () => {
  let service: ApplicantsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    applicant: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicantsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ApplicantsService>(ApplicantsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw ConflictException if email exists', async () => {
      mockPrismaService.applicant.findUnique.mockResolvedValue({ id: '1', email: 'test@test.com' });
      await expect(
        service.create({
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@test.com',
          track: InternshipTrack.FRONTEND_DEVELOPMENT,
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should create an applicant successfully', async () => {
      mockPrismaService.applicant.findUnique.mockResolvedValue(null);
      const mockApplicant = { id: '1', email: 'test@test.com' };
      mockPrismaService.applicant.create.mockResolvedValue(mockApplicant);

      const result = await service.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@test.com',
        track: InternshipTrack.FRONTEND_DEVELOPMENT,
      });

      expect(result).toEqual(mockApplicant);
      expect(mockPrismaService.applicant.create).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if not found', async () => {
      mockPrismaService.applicant.findFirst.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });

    it('should return the applicant', async () => {
      const mockApp = { id: '1' };
      mockPrismaService.applicant.findFirst.mockResolvedValue(mockApp);
      const result = await service.findOne('1');
      expect(result).toEqual(mockApp);
    });
  });

  describe('updateStatus', () => {
    it('should throw BadRequestException if transition is invalid', async () => {
      mockPrismaService.applicant.findFirst.mockResolvedValue({ id: '1', status: ApplicantStatus.REJECTED });
      await expect(service.updateStatus('1', ApplicantStatus.ACCEPTED)).rejects.toThrow(BadRequestException);
    });

    it('should update status successfully', async () => {
      mockPrismaService.applicant.findFirst.mockResolvedValue({ id: '1', status: ApplicantStatus.PENDING });
      mockPrismaService.applicant.update.mockResolvedValue({ id: '1', status: ApplicantStatus.ACCEPTED });

      const result = await service.updateStatus('1', ApplicantStatus.ACCEPTED);
      expect(result.status).toEqual(ApplicantStatus.ACCEPTED);
    });
  });
});

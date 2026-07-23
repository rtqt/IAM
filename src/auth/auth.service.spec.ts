import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwt: JwtService;

  const mockPrismaService = {
    administrator: {
      findUnique: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwt = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should throw UnauthorizedException if admin not found', async () => {
      mockPrismaService.administrator.findUnique.mockResolvedValue(null);

      await expect(
        service.login({ email: 'test@test.com', password: 'password' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      mockPrismaService.administrator.findUnique.mockResolvedValue({
        id: '1',
        email: 'test@test.com',
        password: 'hashedpassword',
      });
      (bcrypt.compare as jest.Mock).mockImplementation(() => Promise.resolve(false) as any);

      await expect(
        service.login({ email: 'test@test.com', password: 'wrongpassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return access token if credentials are valid', async () => {
      mockPrismaService.administrator.findUnique.mockResolvedValue({
        id: '1',
        email: 'test@test.com',
        password: 'hashedpassword',
      });
      (bcrypt.compare as jest.Mock).mockImplementation(() => Promise.resolve(true) as any);
      mockJwtService.sign.mockReturnValue('test-token');

      const result = await service.login({ email: 'test@test.com', password: 'correctpassword' });

      expect(result).toEqual({ access_token: 'test-token' });
      expect(mockJwtService.sign).toHaveBeenCalledWith({ sub: '1', email: 'test@test.com' });
    });
  });
});

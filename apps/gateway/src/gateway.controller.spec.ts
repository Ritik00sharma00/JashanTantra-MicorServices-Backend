import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

describe('GatewayController', () => {
  let controller: GatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [
        {
          provide: GatewayService,
          useValue: {
            getServiceHealth: jest.fn(),
            getUserHealth: jest.fn(),
            getUserHello: jest.fn(),
            getUserById: jest.fn(),
            getUserByEmail: jest.fn(),
            editUserProfile: jest.fn(),
            verifyEmail: jest.fn(),
            findOrganizers: jest.fn(),
            createUser: jest.fn(),
            loginUser: jest.fn(),
            getAllUsers: jest.fn(),
            getAllEvents: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn(() => process.env.API_KEY) },
        },
      ],
    }).compile();

    controller = module.get<GatewayController>(GatewayController);
  });

  it('should expose the all-user list routes for authenticated users', () => {
    expect(typeof controller.getUsers).toBe('function');
    expect(typeof controller.getEvents).toBe('function');
    expect(typeof controller.getAllUsers).toBe('function');
    expect(typeof controller.getAllEvents).toBe('function');
  });

  it('should expose user routes for profile and public profile fetch', () => {
    expect(typeof controller.getUserById).toBe('function');
    expect(typeof controller.editUserProfile).toBe('function');
  });
});


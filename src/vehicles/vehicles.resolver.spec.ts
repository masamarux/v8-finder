import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';
import { VpicApiService } from './services/vpic-api.service';
import { getModelToken } from '@nestjs/mongoose';
import { VehicleMake } from './schemas/vehicle-make.schema';
import { VehicleTypeDto } from './dto/vehicle-type.dto';

describe('VehiclesResolver', () => {
  let resolver: VehiclesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesResolver,
        VehiclesService,
        VpicApiService,
        {
          provide: getModelToken(VehicleMake.name),
          useValue: {},
        },
        {
          provide: getModelToken(VehicleTypeDto.name),
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<VehiclesResolver>(VehiclesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

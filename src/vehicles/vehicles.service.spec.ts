import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { getModelToken } from '@nestjs/mongoose';
import { VehicleMake } from './schemas/vehicle-make.schema';
import { VehicleDto } from './dto/vehicle.dto';
import { VehicleTypeDto } from './dto/vehicle-type.dto';
import { Model } from 'mongoose';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let vehicleModel: Model<VehicleMake>;

  const mockVehicleMake = {
    makeId: '3',
    makeName: 'Lexus',
    vehicleTypes: [{ typeId: '1A', name: 'SUV' }],
  };

  const mockVehicleMakes = [
    { makeId: '1', makeName: 'BMW', vehicleTypes: [{ typeId: '1', name: 'SUV' }] },
    { makeId: '2', makeName: 'Audi',vehicleTypes: [{ typeId: '2', name: 'Sedan' }] },
  ];

  const mockModel = {
    findOne: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockVehicleMake),
    }),
    find: jest.fn().mockReturnValue({
      distinct: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(['1', '2']),
      }),
      exec: jest.fn().mockResolvedValue(mockVehicleMakes),
      lean: jest.fn().mockResolvedValue(mockVehicleMakes),
    }),
    insertMany: jest.fn().mockResolvedValue(mockVehicleMakes),
    updateOne: jest.fn().mockResolvedValue({ nModified: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: getModelToken(VehicleMake.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    vehicleModel = module.get<Model<VehicleMake>>(getModelToken(VehicleMake.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a vehicle make by ID', async () => {
      const result = await service.findById('1');
      expect(result).toEqual(mockVehicleMake);
      expect(vehicleModel.findOne).toHaveBeenCalledWith({ makeId: '1' });
    });
  });

  describe('getAllMakesIds', () => {
    it('should return all distinct vehicle make IDs', async () => {
      const result = await service.getAllMakesIds();
      expect(result).toEqual(['1', '2']);
      expect(vehicleModel.find).toHaveBeenCalled();
    });
  });

  describe.skip('bulkInsertMakes', () => {
    it('should insert new vehicle makes', async () => {
      const vehicleMakesToInsert: VehicleDto[] = [
        {
          makeId: '1',
          makeName: 'BMW',
        },
        {
          makeId: '2',
          makeName: 'Audi',
        },
      ] as VehicleDto[];

      const result = await service.bulkInsertMakes(vehicleMakesToInsert);
      expect(result).toEqual(expect.arrayContaining(mockVehicleMakes));
      expect(vehicleModel.insertMany).toHaveBeenCalledWith(vehicleMakesToInsert);
    });

    it('should not insert existing vehicle makes', async () => {
      const vehicleMakesToInsert: VehicleDto[] = [
        { makeId: '1', makeName: 'BMW' }, // Already exists
      ] as VehicleDto[];

      const result = await service.bulkInsertMakes(vehicleMakesToInsert);
      expect(result).toEqual([]);
    });
  });

  describe.skip('bulkInsertTypes', () => {
    it('should insert new vehicle types for a specific make', async () => {
      const vehicleTypesToInsert: VehicleTypeDto[] = [
        { typeId: '1B', typeName: 'Hatchback' },
      ];

      await service.bulkInsertTypes('1', vehicleTypesToInsert);
      expect(vehicleModel.updateOne).toHaveBeenCalledWith(
        { makeId: '1' },
        { $addToSet: { vehicleTypes: { $each: vehicleTypesToInsert } } },
      );
    });

    it('should not insert types if the make does not exist', async () => {
      await service.bulkInsertTypes('non-existing-id', []);
      expect(vehicleModel.updateOne).not.toHaveBeenCalled();
    });
  });
});


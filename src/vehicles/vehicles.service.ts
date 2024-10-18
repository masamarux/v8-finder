import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VehicleMake } from './schemas/vehicle-make.schema';
import { Model } from 'mongoose';
import { VehicleDto } from './dto/vehicle.dto';
import { VehicleTypeDto } from './dto/vehicle-type.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class VehiclesService {
  private readonly logger = new Logger(VehiclesService.name);
  constructor(
    @InjectModel(VehicleMake.name) private vehicleModel: Model<VehicleMake>,
  ) {}

  async findById(makeId: string): Promise<VehicleMake> {
    return this.vehicleModel.findOne({ makeId }).exec();
  }

  async getAllMakesIds(): Promise<string[]> {
    return this.vehicleModel.find().distinct('makeId').exec();
  }

  async setWasScraped(makeId: string) {
    return this.vehicleModel.updateOne({ makeId }, { wasScraped: true });
  }

  async bulkInsertMakes(data: VehicleDto[]) {
    try {
      const existingMakes = await this.vehicleModel
        .find({
          makeId: { $in: data.map((vehicleMake) => vehicleMake.makeId) },
        })
        .lean();

      const existingMakeIds = new Set(existingMakes.map((make) => make.makeId));

      const newMakes = data.filter(
        (vehicleMake) => !existingMakeIds.has(vehicleMake.makeId),
      );

      if (newMakes.length > 0) {
        return this.vehicleModel.insertMany(newMakes);
      }

      return [];
    } catch (error) {
      this.logger.error('Error inserting vehicle makes:', error);
      throw error;
    }
  }

  async bulkInsertTypes(makeId: string, data: VehicleTypeDto[]) {
    try {
      this.logger.log('Inserting types for make:', makeId);
      const vehicleMake = await this.vehicleModel
        .findOne({
          makeId,
        })
        .exec();

      console.log('vehicleMake', vehicleMake);

      if (!vehicleMake) {
        return;
      }

      const existingTypes = vehicleMake.vehicleTypes;

      const existingTypeIds = new Set(existingTypes.map((type) => type.typeId));

      const newTypes = data.filter(
        (vehicleType) => !existingTypeIds.has(vehicleType.typeId),
      );

      await this.vehicleModel.updateOne(
        { makeId },
        {
          $addToSet: {
            vehicleTypes: { $each: newTypes },
          },
        },
      );
    } catch (error) {
      this.logger.error('Error inserting vehicle types:', error);
      throw error;
    }
  }
}

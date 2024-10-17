import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VehicleMake } from './schemas/vehicle-make.schema';
import { Model } from 'mongoose';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(VehicleMake.name) private vehicleModel: Model<VehicleMake>,
  ) {}

  async findById(makeId: string): Promise<VehicleMake> {
    return this.vehicleModel
      .findOne({ makeId })
      .populate('vehicleTypes')
      .exec();
  }
}

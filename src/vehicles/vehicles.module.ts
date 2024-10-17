import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesResolver } from './vehicles.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleMake, VehicleMakeSchema } from './schemas/vehicle-make.schema';
import { VehicleType, VehicleTypeSchema } from './schemas/vehicle-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VehicleMake.name, schema: VehicleMakeSchema },
      { name: VehicleType.name, schema: VehicleTypeSchema },
    ]),
  ],
  providers: [VehiclesService, VehiclesResolver],
})
export class VehiclesModule {}

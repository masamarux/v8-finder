import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesResolver } from './vehicles.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleMake } from './schemas/vehicle-make.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VehicleMake.name, schema: VehicleMake.schema },
    ]),
  ],
  providers: [VehiclesService, VehiclesResolver],
})
export class VehiclesModule {}

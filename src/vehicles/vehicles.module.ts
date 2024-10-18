import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesResolver } from './vehicles.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleMake, VehicleMakeSchema } from './schemas/vehicle-make.schema';
import { CronJobService } from './cron-jobs/cron-job.service';
import { VpicApiService } from './services/vpic-api.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VehicleMake.name, schema: VehicleMakeSchema },
    ]),
  ],
  providers: [
    VehiclesService,
    VehiclesResolver,
    CronJobService,
    VpicApiService,
  ],
})
export class VehiclesModule {}

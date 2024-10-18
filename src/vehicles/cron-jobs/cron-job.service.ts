import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { VehiclesService } from '../vehicles.service';
import { parseMakesFromXml, parseTypesFromXml } from 'src/utils/xml-parsers';
import { VpicApiService } from '../services/vpic-api.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name);
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly vpicApiService: VpicApiService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const startTime = Date.now();
    this.logger.log('Fetching vehicle makes and types');
    await this.fetchVehicleMakes();
    await this.fetchVehicleTypes();
    const endTime = Date.now();
    this.logger.log(
      `Finished fetching vehicle makes and types in ${
        (endTime - startTime) / 1000
      } seconds`,
    );
  }

  private async fetchVehicleMakes() {
    try {
      const response = await this.vpicApiService.fetchVehicleMakes();

      const makes = parseMakesFromXml(response);

      if (!makes) {
        return;
      }
      await this.vehiclesService.bulkInsertMakes(makes);
    } catch (error) {
      this.logger.error('Error fetching vehicle makes:', error);
    }
  }

  private async fetchVehicleTypes() {
    try {
      const allMakesIds = await this.vehiclesService.getAllMakesIds();

      for (const makeId of allMakesIds) {
        const response =
          await this.vpicApiService.fetchVehicleTypesByMakeId(makeId);

        const typesParsed = parseTypesFromXml(response);

        if (!typesParsed) {
          this.logger.error(`Error parsing vehicle types at makeId: ${makeId}`);
          continue;
        }

        await this.vehiclesService.bulkInsertTypes(makeId, typesParsed);

        await this.vehiclesService.setWasScraped(makeId);
      }
    } catch (error) {
      this.logger.error('Error fetching vehicle types:', error);
    }
  }
}

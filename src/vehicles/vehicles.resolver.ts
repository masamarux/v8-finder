import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { VehiclesService } from './vehicles.service';
import { VehicleDto } from './dto/vehicle.dto';
import { NotFoundException } from '@nestjs/common';
import { VpicApiService } from './services/vpic-api.service';
import { parseTypesFromXml } from '../utils/xml-parsers';

@Resolver(() => VehicleDto)
export class VehiclesResolver {
  constructor(
    private vehiclesService: VehiclesService,
    private readonly vpicApiService: VpicApiService,
  ) {}

  @Query(() => VehicleDto, { name: 'getVehicle' })
  async getVehicle(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<VehicleDto> {
    const vehicle = await this.vehiclesService.findById(id);

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }

    if (!vehicle.wasScraped) {
      const response = await this.vpicApiService.fetchVehicleTypesByMakeId(
        vehicle.makeId,
      );

      const typesParsed = parseTypesFromXml(response);

      if (!typesParsed) {
        console.error(
          `Error parsing vehicle types at makeId: ${vehicle.makeId}`,
        );
        return vehicle;
      }

      await this.vehiclesService.bulkInsertTypes(vehicle.makeId, typesParsed);

      vehicle.wasScraped = true;
      await vehicle.save();

      vehicle.vehicleTypes = typesParsed;
    }

    return vehicle;
  }
}

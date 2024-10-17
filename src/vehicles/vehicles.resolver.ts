import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { VehiclesService } from './vehicles.service';
import { VehicleDto } from './dto/vehicle.dto';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => VehicleDto)
export class VehiclesResolver {
  constructor(private vehiclesService: VehiclesService) {}

  @Query(() => VehicleDto, { name: 'getVehicle' })
  async getVehicle(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<VehicleDto> {
    const vehicle = await this.vehiclesService.findById(id);

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }

    return vehicle;
  }
}

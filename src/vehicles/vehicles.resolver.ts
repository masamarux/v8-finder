import { Resolver } from '@nestjs/graphql';
import { VehiclesService } from './vehicles.service';
import { Query } from '@nestjs/common';

@Resolver()
export class VehiclesResolver {
  constructor(private vehiclesService: VehiclesService) {}

  @Query(() => String)
}

import { Field, ObjectType, ID } from '@nestjs/graphql';
import { VehicleTypeDto } from './vehicle-type.dto';

@ObjectType()
export class VehicleDto {
  @Field(() => ID)
  makeId: string;

  @Field()
  makeName: string;

  @Field(() => [VehicleTypeDto])
  vehicleTypes: VehicleTypeDto[];
}

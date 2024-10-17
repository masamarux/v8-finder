import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class VehicleTypeDto {
  @Field(() => ID)
  typeId: string;

  @Field()
  typeName: string;
}

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { VehicleType } from './vehicle-type.schema';

@Schema()
export class VehicleMake extends Document {
  @Prop({ required: true })
  makeId: string;

  @Prop({ required: true })
  makeName: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: VehicleType.name }],
    required: true,
  })
  vehicleTypes: VehicleType[];
}

export const VehicleMakeSchema = SchemaFactory.createForClass(VehicleMake);

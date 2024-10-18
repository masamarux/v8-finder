import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class VehicleMake extends Document {
  @Prop({ required: true })
  makeId: string;

  @Prop({ required: true })
  makeName: string;

  @Prop({
    type: [
      {
        typeId: String,
        typeName: String,
      },
    ],
    required: false,
  })
  vehicleTypes: {
    typeId: string;
    typeName: string;
  }[];

  @Prop({ default: false })
  wasScraped: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const VehicleMakeSchema = SchemaFactory.createForClass(VehicleMake);

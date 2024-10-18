import { isArray } from 'lodash';
import { VehicleTypeDto } from 'src/vehicles/dto/vehicle-type.dto';
import { VehicleDto } from 'src/vehicles/dto/vehicle.dto';
import { ElementCompact, xml2js } from 'xml-js';

export function parseMakesFromXml(xml: string) {
  const result: ElementCompact = xml2js(xml, { compact: true });

  if (
    !result ||
    !result.Response ||
    !result.Response.Results ||
    !result.Response.Results.AllVehicleMakes
  ) {
    return null;
  }

  const allVehicleMakes: {
    Make_ID: {
      _text: string;
    };
    Make_Name: {
      _text: string;
    };
  }[] = result.Response.Results.AllVehicleMakes;

  const makesParsed = allVehicleMakes.map((make) => {
    return {
      makeId: make.Make_ID._text,
      makeName: make.Make_Name._text,
    } as VehicleDto;
  });

  if (makesParsed.length <= 0) {
    return null;
  }

  return makesParsed;
}

export function parseTypesFromXml(xml: string) {
  const result: ElementCompact = xml2js(xml, { compact: true });

  if (
    !result ||
    !result.Response ||
    !result.Response.Results ||
    !result.Response.Results.VehicleTypesForMakeIds
  ) {
    return null;
  }

  const allVehicleTypes:
    | {
        VehicleTypeId: {
          _text: string;
        };
        VehicleTypeName: {
          _text: string;
        };
      }
    | {
        VehicleTypeId: {
          _text: string;
        };
        VehicleTypeName: {
          _text: string;
        };
      }[] = result.Response.Results.VehicleTypesForMakeIds;

  const isAnArray = isArray(allVehicleTypes);

  if (!isAnArray) {
    const types = [
      {
        typeId: allVehicleTypes.VehicleTypeId._text,
        typeName: allVehicleTypes.VehicleTypeName._text,
      },
    ] as VehicleTypeDto[];

    return types;
  }

  const types = [] as VehicleTypeDto[];
  for (const type of allVehicleTypes) {
    const typesParsed = {
      typeId: type.VehicleTypeId._text,
      typeName: type.VehicleTypeName._text,
    } as VehicleTypeDto;

    types.push(typesParsed);
  }

  if (types.length <= 0) {
    return null;
  }

  return types;
}

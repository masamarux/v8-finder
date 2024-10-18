import { parseMakesFromXml, parseTypesFromXml } from './xml-parsers';

describe('XML Parsers', () => {
  describe('parseMakesFromXml', () => {
    it('should correctly parse a valid XML of vehicle makes', () => {
      const xml = `
        <Response
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:xsd="http://www.w3.org/2001/XMLSchema">
          <Count>11565</Count>
          <Message>Response returned successfully</Message>
          <Results>
            <AllVehicleMakes>
              <Make_ID>474</Make_ID>
              <Make_Name>HONDA</Make_Name>
            </AllVehicleMakes>
            <AllVehicleMakes>
              <Make_ID>448</Make_ID>
              <Make_Name>TOYOTA</Make_Name>
            </AllVehicleMakes>
          </Results>
        </Response>
      `;

      const result = parseMakesFromXml(xml);

      expect(result).toEqual([
        { makeId: '474', makeName: 'HONDA' },
        { makeId: '448', makeName: 'TOYOTA' },
      ]);
    });

    it('should return null for invalid XML', () => {
      const invalidXml = `<InvalidXml></InvalidXml>`;
      const result = parseMakesFromXml(invalidXml);
      expect(result).toBeNull();
    });
  });

  describe('parseTypesFromXml', () => {
    it('should correctly parse a valid XML of vehicle types', () => {
      const xml = `
        <Response
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:xsd="http://www.w3.org/2001/XMLSchema">
          <Count>5</Count>
          <Message>Response returned successfully</Message>
          <SearchCriteria>Make ID: 474</SearchCriteria>
          <Results>
            <VehicleTypesForMakeIds>
              <VehicleTypeId>1</VehicleTypeId>
              <VehicleTypeName>Motorcycle</VehicleTypeName>
            </VehicleTypesForMakeIds>
            <VehicleTypesForMakeIds>
              <VehicleTypeId>2</VehicleTypeId>
              <VehicleTypeName>Passenger Car</VehicleTypeName>
            </VehicleTypesForMakeIds>
            <VehicleTypesForMakeIds>
              <VehicleTypeId>3</VehicleTypeId>
              <VehicleTypeName>Truck</VehicleTypeName>
            </VehicleTypesForMakeIds>
            <VehicleTypesForMakeIds>
              <VehicleTypeId>7</VehicleTypeId>
              <VehicleTypeName>Multipurpose Passenger Vehicle (MPV)</VehicleTypeName>
            </VehicleTypesForMakeIds>
            <VehicleTypesForMakeIds>
              <VehicleTypeId>9</VehicleTypeId>
              <VehicleTypeName>Low Speed Vehicle (LSV)</VehicleTypeName>
            </VehicleTypesForMakeIds>
          </Results>
        </Response>
      `;

      const result = parseTypesFromXml(xml);

      expect(result).toEqual([
        { typeId: '1', typeName: 'Motorcycle' },
        { typeId: '2', typeName: 'Passenger Car' },
        { typeId: '3', typeName: 'Truck' },
        { typeId: '7', typeName: 'Multipurpose Passenger Vehicle (MPV)' },
        { typeId: '9', typeName: 'Low Speed Vehicle (LSV)' },
      ]);
    });

    it('should return null for invalid XML', () => {
      const invalidXml = `<InvalidXml></InvalidXml>`;
      const result = parseTypesFromXml(invalidXml);
      expect(result).toBeNull();
    });
  });
});

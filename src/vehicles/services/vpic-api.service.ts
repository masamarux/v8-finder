import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class VpicApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://vpic.nhtsa.dot.gov/api/vehicles',
    });
  }

  async fetchVehicleMakes(): Promise<string> {
    const response = await this.api.get('getallmakes?format=XML');
    return response.data;
  }

  async fetchVehicleTypesByMakeId(makeId: string): Promise<string> {
    const response = await this.api.get(
      `/GetVehicleTypesForMakeId/${makeId}?format=xml`,
    );
    return response.data;
  }
}

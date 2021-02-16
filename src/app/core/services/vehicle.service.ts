import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { VehicleInterface } from '../interfaces/vehicle.interface';
import { CreateVehicleInterface } from "../interfaces/create-vehicle.interface";

const baseURL = environment.apiURL + '/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(
    private http: HttpClient
  ) {}

  createVehicle(vehicleData: CreateVehicleInterface) {
    const url = baseURL + `/new`;

    const data = {
      plate: vehicleData.plate,
      brand: vehicleData.brand,
      model: vehicleData.model,
      colour: vehicleData.colour,
      ownerId: vehicleData.ownerId
    };

    return this.http.post<VehicleInterface>(url, data, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getAllVehicles() {
    const url = baseURL + `/`;

    return this.http.get<VehicleInterface[]>(url, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getVehicleWithId(id: number) {
    const url = baseURL + `/${id}`;

    return this.http.get<VehicleInterface>(url, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  editVehicle(id: number, vehicleData: VehicleInterface) {
    const url = baseURL + `/${id}/edit`;

    const data = {
      brand: vehicleData.brand,
      model: vehicleData.model,
      colour: vehicleData.colour
    };

    return this.http.patch<VehicleInterface>(url, data, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  deactivateVehicle(id: number) {
    const url = baseURL + `/${id}/deactivate`;

    return this.http.patch<VehicleInterface>(url, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

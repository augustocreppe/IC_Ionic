import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { OwnerInterface } from '../interfaces/owner.interface';
import { VehicleInterface } from '../interfaces/vehicle.interface';

const baseURL = environment.apiURL + '/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  constructor(
    private http: HttpClient
  ) {}

  createOwner(ownerData: OwnerInterface) {
    const url = baseURL + `/new`;

    const data = {
      name: ownerData.name,
      email: ownerData.email,
      cpf: ownerData.cpf,
      birthdate: ownerData.birthdate,
      cep: ownerData.cep,
      phone: ownerData.phone,
      type: ownerData.type
    };

    return this.http.post<OwnerInterface>(url, data, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getAllOwners() {
    const url = baseURL + `/`;

    return this.http.get<OwnerInterface[]>(url, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getUserWithId(id: number) {
    const url = baseURL + `/${id}`;

    return this.http.get<OwnerInterface>(url, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  editOwner(id: number, ownerData: OwnerInterface) {
    const url = baseURL + `/${id}/edit`;

    const data = {
      name: ownerData.name,
      email: ownerData.email,
      birthdate: ownerData.birthdate,
      cep: ownerData.cep,
      phone: ownerData.phone,
      type: ownerData.type
    };

    return this.http.patch<OwnerInterface>(url, data, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  deactivateOwner(id: number) {
    const url = baseURL + `/${id}/deactivate`;

    return this.http.patch<OwnerInterface>(url, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getOwnerVehicles(id: number) {
    const url = baseURL + `/${id}/vehicles`;

    return this.http.get<VehicleInterface[]>(url, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

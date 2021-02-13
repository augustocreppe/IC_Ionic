import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { OwnerInterface } from '../interfaces/owner.interface';

const baseURL = environment.apiURL + '/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  constructor(
    private http: HttpClient
  ) {}

  getUserWithId(id: number) {
    const url = baseURL + `/${id}`;

    return this.http.get<OwnerInterface>(url, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

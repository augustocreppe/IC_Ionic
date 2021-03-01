import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../core/services/vehicle.service';
import { VehicleInterface } from '../core/interfaces/vehicle.interface';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-v',
  templateUrl: './search-v.page.html',
  styleUrls: ['./search-v.page.scss'],
})
export class SearchVPage implements OnInit {
  vehicles: VehicleInterface[];
  showVehicles: VehicleInterface[] = [];
  ready = false;

  constructor(
    private loadingController: LoadingController,
    private vehicleService: VehicleService,
    private router: Router
  ) { }

  ngOnInit() { 
    this.loadData(null);
  }

  searchVehicle(event) {
    const searchText = event.target.value;

    this.showVehicles = this.vehicles.filter(vehicle => {
      if(vehicle.plate.includes(searchText)) {
        return vehicle;
      }
    });
  }

  loadData(event) {
    this.vehicleService.getAllVehicles(null).subscribe(
      (data) => {
        if(event) {
          event.target.complete();
        }

        this.vehicles = data.body;
        this.showVehicles = this.vehicles;

        this.ready = true;
      }
    );
  }
}

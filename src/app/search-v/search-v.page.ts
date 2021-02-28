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
  ready = false;

  constructor(
    private loadingController: LoadingController,
    private vehicleService: VehicleService,
    private router: Router
  ) { }

  ngOnInit() { }

  searchVehicle(event) {
    const searchText = event.target.value;

    this.vehicleService.getAllVehicles(searchText).subscribe(
      (data) => {
        this.vehicles = data.body;
        console.log(this.vehicles)
        this.ready = true;
      }
    );
  }
}

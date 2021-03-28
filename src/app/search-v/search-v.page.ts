import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../core/services/vehicle.service';
import { VehicleInterface } from '../core/interfaces/vehicle.interface';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { OwnerService } from '../core/services/owner.service';
import { OwnerInterface } from '../core/interfaces/owner.interface';

@Component({
  selector: 'app-search-v',
  templateUrl: './search-v.page.html',
  styleUrls: ['./search-v.page.scss'],
})

export class SearchVPage implements OnInit {
  vehicles: VehicleInterface[] = [];
  showVehicles: VehicleInterface[] = [];
  ready = false;
  resp = false;

  owners: OwnerInterface[] = [];
  nameOwner: string;

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    public alertController: AlertController,
    
    private ownerService: OwnerService,
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

        this.ownerService.getAllOwners(null).subscribe(
          (data) => {
            this.owners = data.body;

            this.ready = true;
          }
        );
      }
    );
  }

  getOwnerName(ownerId: number) {
    const owner = this.owners.find(owner => owner.id === ownerId);

    this.nameOwner = owner.name.substring(0,7);
    return this.nameOwner;
  }

  falarBrand(brand) {
    alert("Marca: " + brand);
  }

  falarModel(model) {
    alert("Modelo: " + model);
  }

  falarColour(colour) {
    alert("Cor: " + colour);
  }

  falarOwner(owner) {
    alert("Proprietário: " + owner);
  }

  excluirVeiculo(id){
    this.alertController.create({
      header: `Confirmação de Exclusão`,
      message: 'Você deseja excluir este veículo?',
      buttons: [{
        text: 'Não',
        role: 'cancel',
      }, {
        text: 'Sim',
        handler: () => {
          this.vehicleService.deactivateVehicle(id).subscribe(
            (res) => { alert("Exclusão feita com sucesso!"), this.router.navigate(['/menu']);  }, 
            (err) => console.log(err)
          );
        }
      }
      ]
    }).then(res => {
      res.present();
    });
  }
}

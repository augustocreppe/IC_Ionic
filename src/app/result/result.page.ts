import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleService } from '../core/services/vehicle.service';
import { VehicleInterface } from '../core/interfaces/vehicle.interface';
import { OwnerService } from '../core/services/owner.service';
import { OwnerInterface } from '../core/interfaces/owner.interface';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})

export class ResultPage implements OnInit {
  vehicle: VehicleInterface[];
  owner: OwnerInterface;
  placa: string;
  myVehicle: VehicleInterface;
  myOwner: string;
  ready = false;

  constructor(
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private ownerService: OwnerService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.placa = params['placa'];
    });

    this.vehicleService.getAllVehicles(this.placa).subscribe(
      (data) => {
        this.vehicle = data.body;
        this.myVehicle = this.vehicle[0];

        if(this.myVehicle != undefined)
        {
          this.ownerService.getOwnerWithId(this.myVehicle.ownerId).subscribe(
            (data) => {
              this.owner = data.body;
              this.myOwner = this.owner.name;
  
              this.ready = true;
            }
          );
        }
        else if(this.myVehicle == undefined)
        {
          this.ready = true;
        }
      }
    );
  }

  deleteVehicle(id) {
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

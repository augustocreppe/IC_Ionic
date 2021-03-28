import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleService } from '../core/services/vehicle.service';
import { VehicleInterface } from '../core/interfaces/vehicle.interface';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})

export class ResultPage implements OnInit {
  vehicle: VehicleInterface[];
  placa: string;
  myVehicle: VehicleInterface;
  ready = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.placa = params['placa'];
    });

    this.vehicleService.getAllVehicles(this.placa).subscribe(
      (data) => {
        this.vehicle = data.body;
        this.myVehicle = this.vehicle[0];
        this.ready = true;
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

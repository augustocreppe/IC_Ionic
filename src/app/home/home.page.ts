import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { OwnerService } from '../core/services/owner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  constructor(
    private alertController: AlertController,
    private ownerService: OwnerService
  ) {}

  teste() {
    this.ownerService.getOwnerWithId(1).subscribe(
      (data) => {
        console.log(data)
        console.log(data.body)
      }, (err) => this.connectionAlert(err)
    )
  }

  connectionAlert(err): void {
    const status: number = err.status;

    this.alertController.create({
      header: `Erro ${status}!`,
      message: 'Algo inesperado aconteceu!\nVerifique a sua conexão....',
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VehicleService } from '../core/services/vehicle.service';
import { VehicleInterface } from '../core/interfaces/vehicle.interface';
import { CreateVehicleInterface } from '../core/interfaces/create-vehicle.interface';
import { LoadingController } from '@ionic/angular';
import { OwnerService } from '../core/services/owner.service';
import { OwnerInterface } from '../core/interfaces/owner.interface';

@Component({
  selector: 'app-cadastro-v',
  templateUrl: './cadastro-v.page.html',
  styleUrls: ['./cadastro-v.page.scss'],
})

export class CadastroVPage implements OnInit {
  formCadV: FormGroup;
  isSubmitted = false;
  ready = false;
  owners: OwnerInterface[];

  constructor(
    public formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private vehicleService: VehicleService,
    private ownerService: OwnerService
  ) { }

  ngOnInit() {
    //listar todos os owners
    this.ownerService.getAllOwners().subscribe(
      (data) => {
        this.owners = data.body;
        console.log(this.owners)
        this.ready = true;
      }
    );

    this.formCadV = this.formBuilder.group({
      plate:  ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern('^[a-zA-Z]{3}[0-9]{1}[a-zA-Z0-9]{1}[0-9]{2}$')]],
      brand:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      model:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      colour: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      owner:  ['', [Validators.required]],
    })
  }

  get errorControl() {
    return this.formCadV.controls;
  }

  cadastrarVeiculo() {
    this.isSubmitted = true;
    if (!this.formCadV.valid) {
      console.log('Por favor, forneça todos os dados!')
      return false;
    }
    
    const loading = this.loadingController.create({
      message: 'Salvando os dados...'
    }).then(anim => {
      anim.present();

      const data: CreateVehicleInterface = {
        plate: this.formCadV.get('plate').value,
        brand: this.formCadV.get('brand').value,
        model: this.formCadV.get('model').value,
        colour: this.formCadV.get('colour').value,
        ownerId: this.formCadV.get('owner').value,
      }

      this.vehicleService.createVehicle(data).subscribe(
        (res) => {}, 
        (err) => console.log(err)
      );

      anim.dismiss();
    });
  }
}

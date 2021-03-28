import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VehicleService } from '../core/services/vehicle.service';
import { VehicleInterface } from '../core/interfaces/vehicle.interface';
import { CreateVehicleInterface } from '../core/interfaces/create-vehicle.interface';
import { LoadingController } from '@ionic/angular';
import { OwnerService } from '../core/services/owner.service';
import { OwnerInterface } from '../core/interfaces/owner.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-v',
  templateUrl: './cadastro-v.page.html',
  styleUrls: ['./cadastro-v.page.scss'],
})

export class CadastroVPage implements OnInit {
  formCadV: FormGroup;
  isSubmitted = false;
  owners: OwnerInterface[];
  vehicle: VehicleInterface;
  placa: string;
  ready = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private vehicleService: VehicleService,
    private ownerService: OwnerService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.placa = params['placa'];

      if(this.placa == '0')
        this.placa = '';
    });

    this.ownerService.getAllOwners(null).subscribe(
      (data) => {
        this.owners = data.body;
        this.ready = true;
      }
    );

    this.formCadV = this.formBuilder.group({
      plate:  [this.placa, [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern('^[a-zA-Z]{3}[0-9]{1}[a-zA-Z0-9]{1}[0-9]{2}$')]],
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
      return false;
    }
    
    const loading = this.loadingController.create({
      message: 'Salvando os dados...'
    }).then(anim => {
      anim.present();

      const plate: string = this.formCadV.get('plate').value;

      const data: CreateVehicleInterface = {
        plate: plate.toUpperCase(),
        brand: this.formCadV.get('brand').value,
        model: this.formCadV.get('model').value,
        colour: this.formCadV.get('colour').value,
        ownerId: this.formCadV.get('owner').value,
      }

      this.vehicleService.createVehicle(data).subscribe(
        (res) => { alert("Cadastro feito com sucesso!"), this.router.navigate(['/menu']); },
        (err) => console.log(err)
      );

      anim.dismiss();
    });
  }
}

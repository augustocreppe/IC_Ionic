import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VehicleService } from '../core/services/vehicle.service';
import { VehicleInterface } from '../core/interfaces/vehicle.interface';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnerService } from '../core/services/owner.service';
import { OwnerInterface } from '../core/interfaces/owner.interface';

@Component({
  selector: 'app-edicao-v',
  templateUrl: './edicao-v.page.html',
  styleUrls: ['./edicao-v.page.scss'],
})

export class EdicaoVPage implements OnInit {
  formEditV: FormGroup;
  isSubmitted = false;
  owners: OwnerInterface[];
  vehicle: VehicleInterface;
  id: number;
  ready = false;

  constructor(
    public formBuilder: FormBuilder, 
    private loadingController: LoadingController,
    private vehicleService: VehicleService,
    private ownerService: OwnerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; 
    });

    this.ownerService.getAllOwners(null).subscribe(
      (data) => {
        this.owners = data.body;
      }
    );

    this.vehicleService.getVehicleWithId(this.id).subscribe(
      (data) => {
        this.vehicle = data.body;

        this.formEditV = this.formBuilder.group({
          plate:    [this.vehicle.plate, [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern('^[a-zA-Z]{3}[0-9]{1}[a-zA-Z0-9]{1}[0-9]{2}$')]],      
          brand:    [this.vehicle.brand, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
          model:    [this.vehicle.model, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
          colour:   [this.vehicle.colour, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
          ownerId:  [this.vehicle.ownerId, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        });

        this.ready = true;
      }
    );
  }

  get errorControl() {
    return this.formEditV.controls;
  }

  alterarVeiculo() {
    this.isSubmitted = true;
    if (!this.formEditV.valid) {
      return false;
    } 
    
    const loading = this.loadingController.create({
      message: 'Salvando os dados...'
    }).then(anim => {
      anim.present();

      const data: VehicleInterface = {
        plate: this.formEditV.get('name').value,
        brand: this.formEditV.get('brand').value,
        model: this.formEditV.get('model').value,
        colour: this.formEditV.get('colour').value,
        ownerId: this.formEditV.get('owner').value,
      }

      this.vehicleService.editVehicle(this.id, data).subscribe(
        (res) => { alert("Edição feita com sucesso!"), this.router.navigate(['/menu']); }, 
        (err) => console.log(err)
      );

      anim.dismiss();
    });
  }
}
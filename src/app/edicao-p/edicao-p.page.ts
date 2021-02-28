import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OwnerService } from '../core/services/owner.service';
import { OwnerInterface } from '../core/interfaces/owner.interface';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edicao-p',
  templateUrl: './edicao-p.page.html',
  styleUrls: ['./edicao-p.page.scss'],
})

export class EdicaoPPage implements OnInit {
  formEditP: FormGroup;
  isSubmitted = false;
  owner: OwnerInterface;
  id: number;
  ready = false;

  constructor(
    public formBuilder: FormBuilder, 
    private loadingController: LoadingController,
    private ownerService: OwnerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; 
    });

    this.ownerService.getOwnerWithId(this.id).subscribe(
      (data) => {
        this.owner = data.body;

        this.formEditP = this.formBuilder.group({
          name:       [this.owner.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
          birthdate:  [this.owner.birthdate],
          cep:        [this.owner.cep, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          email:      [this.owner.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
          phone:      [this.owner.phone, [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
          type:       [this.owner.type, [Validators.required]]
        });

        this.ready = true;
      }
    );
  }

  get errorControl() {
    return this.formEditP.controls;
  }

  alterarPessoa() {
    this.isSubmitted = true;
    if (!this.formEditP.valid) {
      return false;
    } 
    
    const loading = this.loadingController.create({
      message: 'Salvando os dados...'
    }).then(anim => {
      anim.present();

      let cep: string = this.formEditP.get('cep').value;
      cep = cep.replace('.', '').replace('-', '');

      let phone: string = this.formEditP.get('phone').value;
      phone = phone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '');

      const data: OwnerInterface = {
        name: this.formEditP.get('name').value,
        email: this.formEditP.get('email').value,
        birthdate: this.formEditP.get('birthdate').value,
        cep,
        phone,
        type: this.formEditP.get('type').value
      }

      this.ownerService.editOwner(this.id, data).subscribe(
        (res) => { alert("Edição feita com sucesso!"), this.router.navigate(['/menu']); }, 
        (err) => console.log(err)
      );

      anim.dismiss();
    });
  }
}

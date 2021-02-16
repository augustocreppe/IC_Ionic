import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OwnerService } from '../core/services/owner.service';
import { OwnerInterface } from '../core/interfaces/owner.interface';
import { CreateOwnerInterface } from '../core/interfaces/create-owner.interface';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-p',
  templateUrl: './cadastro-p.page.html',
  styleUrls: ['./cadastro-p.page.scss'],
})

export class CadastroPPage implements OnInit {
  formCadP: FormGroup;
  defaultDate = "2000-01-01";
  isSubmitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private ownerService: OwnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formCadP = this.formBuilder.group({
      name:       ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      birthdate:  [this.defaultDate],
      cpf:        ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      cep:        ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email:      ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone:      ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
      type:       ['', [Validators.required]]
    })
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.formCadP.get('dob').setValue(date, {
      onlyself: true
    })
  }

  get errorControl() {
    return this.formCadP.controls;
  }

  cadastrarPessoa() {
    this.isSubmitted = true;
    if (!this.formCadP.valid) {
      return false;
    }

    const loading = this.loadingController.create({
      message: 'Salvando os dados...'
    }).then(anim => {
      anim.present();

      let cpf: string = this.formCadP.get('cpf').value;
      cpf = cpf.replace('.', '').replace('.', '').replace('-', '');

      let cep: string = this.formCadP.get('cep').value;
      cep = cep.replace('.', '').replace('-', '');

      let phone: string = this.formCadP.get('phone').value;
      phone = phone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '');

      const data: CreateOwnerInterface = {
        name: this.formCadP.get('name').value,
        email: this.formCadP.get('email').value,
        cpf,
        birthdate: this.formCadP.get('birthdate').value,
        cep,
        phone,
        type: this.formCadP.get('type').value
      }

      this.ownerService.createOwner(data).subscribe(
        (res) => { alert("Cadastro feito com sucesso!"), this.router.navigate(['/menu']); }, 
        (err) => console.log(err)
      );

      anim.dismiss();
    });
  }
}
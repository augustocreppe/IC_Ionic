import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-cadastro-p',
  templateUrl: './cadastro-p.page.html',
  styleUrls: ['./cadastro-p.page.scss'],
})

export class CadastroPPage implements OnInit {
  formCadP: FormGroup;
  defaultDate = "2000-01-01";
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formCadP = this.formBuilder.group({
      nome:   ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      data:   [this.defaultDate],
      cpf:    ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
      cep:    ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')]],
      email:  ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      tel:    ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
      tipo:   ['', [Validators.required]]
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
      console.log('Por favor, forneça todos os dados!')
      return false;
    } else {
      console.log(this.formCadP.value)
    }
  }
}
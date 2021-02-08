import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-cadastro-v',
  templateUrl: './cadastro-v.page.html',
  styleUrls: ['./cadastro-v.page.scss'],
})

export class CadastroVPage implements OnInit {
  formCadV: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formCadV = this.formBuilder.group({
      placa:  ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern('^[a-zA-Z]{3}[0-9]{1}[a-zA-Z0-9]{1}[0-9]{2}$')]],
      marca:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      modelo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      cor:    ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      prop:   ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
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
    else {
      console.log(this.formCadV.value);
    }
  }
}

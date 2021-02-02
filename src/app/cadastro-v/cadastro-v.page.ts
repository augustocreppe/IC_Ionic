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
      placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern('^[a-zA-Z0-9]*$')]],
      marca: [],
      modelo: [],
      cor: [],
      prop: [],

    })
  }

  get errorControl() {
    return this.formCadV.controls;
  }

  cadastrarVeiculo() {
    if(this.isSubmitted &&  (this.errorControl.placa.errors?.minlength || 
       this.errorControl.placa.errors?.maxlength || 
       this.errorControl.placa.errors?.pattern || 
       this.errorControl.placa.errors?.required))
    {
      
    }

    this.isSubmitted = true;
    if (!this.formCadV.valid) {
      return false;
    } 
    else {
      console.log(this.formCadV.value);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-edicao-v',
  templateUrl: './edicao-v.page.html',
  styleUrls: ['./edicao-v.page.scss'],
})

export class EdicaoVPage implements OnInit {
  formEditV: FormGroup;
  formEditV2: FormGroup;
  isSubmitted = false;
  isSubmitted2 = false;
  modoPesquisa = true;
  modoMostra = false;

  constructor(public formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formEditV = this.formBuilder.group({
      placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern('^[a-zA-Z]{3}[0-9]{1}[a-zA-Z0-9]{1}[0-9]{2}$')]],
    })

    this.formEditV2 = this.formBuilder.group({
      placa:  ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern('^[a-zA-Z]{3}[0-9]{1}[a-zA-Z0-9]{1}[0-9]{2}$')]],      
      marca:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      modelo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      cor:    ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      prop:   ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    })
  }

  get errorControl() {
    return this.formEditV.controls;
  }

  get errorControl2() {
    return this.formEditV2.controls;
  }

  pesquisarVeiculo() {
    this.isSubmitted = true;
    if (!this.formEditV.valid) {
      return false;
    } 
    else {
      console.log(this.formEditV.value);
      
      this.modoPesquisa = false;
      this.modoMostra = true;
    }
  }

  alterarVeiculo() {
    this.isSubmitted2 = true;
    if (!this.formEditV2.valid) {
      return false;
    } 
    else {
      console.log(this.formEditV2.value);
      
      alert("alterado!");
    }
  }
}

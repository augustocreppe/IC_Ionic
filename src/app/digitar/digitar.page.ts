import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-digitar',
  templateUrl: './digitar.page.html',
  styleUrls: ['./digitar.page.scss'],
})

export class DigitarPage implements OnInit {
  formPlaca: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formPlaca = this.formBuilder.group({
      placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern('^[a-zA-Z0-9]*$')]],
    })
  }

  get errorControl() {
    return this.formPlaca.controls;
  }

  verificarVeiculo() {
    this.isSubmitted = true;
    if (!this.formPlaca.valid) {
      return false;
    } 
    else {
      console.log(this.formPlaca.value);
    }
  }
}

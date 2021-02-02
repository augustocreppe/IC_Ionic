import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-cadastro-p',
  templateUrl: './cadastro-p.page.html',
  styleUrls: ['./cadastro-p.page.scss'],
})

export class CadastroPPage implements OnInit {
  formPessoa: FormGroup;
  defaultDate = "2000-01-01";
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formPessoa = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      data: [this.defaultDate],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      tipo: ['', [Validators.required]]
    })
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.formPessoa.get('dob').setValue(date, {
      onlyself: true
    })
  }

  get errorControl() {
    return this.formPessoa.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.formPessoa.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.formPessoa.value)
    }
  }
}
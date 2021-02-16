import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OwnerService } from '../core/services/owner.service';
import { OwnerInterface } from '../core/interfaces/owner.interface';
import { CreateOwnerInterface } from '../core/interfaces/create-owner.interface';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edicao-p',
  templateUrl: './edicao-p.page.html',
  styleUrls: ['./edicao-p.page.scss'],
})

export class EdicaoPPage implements OnInit {
  formEditP: FormGroup;
  formEditP2: FormGroup;
  isSubmitted = false;
  isSubmitted2 = false;
  modoPesquisa = true;
  modoMostra = false;
  defaultDate = "2000-01-01";

  constructor(public formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formEditP = this.formBuilder.group({
      nome:   ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    })

    this.formEditP2 = this.formBuilder.group({
      nome:   ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      data:   [this.defaultDate],
      cpf:    ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      cep:    ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email:  ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      tel:    ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
      tipo:   ['', [Validators.required]]
    })
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.formEditP2.get('dob').setValue(date, {
      onlyself: true
    })
  }

  get errorControl() {
    return this.formEditP.controls;
  }

  get errorControl2() {
    return this.formEditP2.controls;
  }

  pesquisarPessoa() {
    this.isSubmitted = true;
    if (!this.formEditP.valid) {
      return false;
    } 
    else {
      console.log(this.formEditP.value);
      
      this.modoPesquisa = false;
      this.modoMostra = true;
    }
  }

  alterarPessoa() {
    this.isSubmitted2 = true;
    if (!this.formEditP2.valid) {
      return false;
    } 
    else {
      console.log(this.formEditP2.value);
      
      alert("alterado!");
    }
  }
}

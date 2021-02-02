import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digitar',
  templateUrl: './digitar.page.html',
  styleUrls: ['./digitar.page.scss'],
})

export class DigitarPage implements OnInit {

  constructor() { }

  placa = '';

  inputPlaca: string="";

  verificarVeiculo() {
    this.placa = this.inputPlaca;

    if(this.placa == '')
    {
      alert(this.placa);
    }
    else if (!this.placa.match(`^[a-zA-Z0-9]*$`))
    {
      alert(this.placa);
    }
    else
      alert(this.placa);
  }

  ngOnInit() {
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})

export class ContaPage implements OnInit {
  cidade: string

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.pesquisarPlaca('EUL2F71').subscribe((res) => {
      const data = res.body;
      console.log(data);
    });
  }

  pesquisarPlaca(placa: string) {
    const url = `https://apicarros.com/v1/consulta/${placa}/json`;

    return this.http.get(url, {
      observe: 'response'
    });
  }
}
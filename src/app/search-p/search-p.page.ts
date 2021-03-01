import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../core/services/owner.service';
import { OwnerInterface } from '../core/interfaces/owner.interface';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-search-p',
  templateUrl: './search-p.page.html',
  styleUrls: ['./search-p.page.scss'],
})

export class SearchPPage implements OnInit {
  owners: OwnerInterface[] = [];
  showOwners: OwnerInterface[] = [];
  ready = false;
  resp = false;

  constructor(
    private ownerService: OwnerService,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadData(null);
  }

  searchOwner(event) {
    const searchText = event.target.value;
    
    this.showOwners = this.owners.filter(owner => {
      if(owner.name.includes(searchText)) {
        return owner;
      }
    });
  }

  loadData(event) {
    this.ownerService.getAllOwners(null).subscribe(
      (data) => {
        if(event) {
          event.target.complete();
        }

        this.owners = data.body;
        this.showOwners = this.owners;

        this.ready = true;
      }
    );
  }

  falarEmail(email) {
    alert("Email: " + email);
  }

  falarNome(nome) {
    alert("Nome: " + nome);
  }

  excluirPessoa(id){
    this.alertController.create({
      header: `Confirmação de Exclusão`,
      message: 'Você deseja excluir esta pessoa?',
      buttons: [{
        text: 'Não',
        role: 'cancel',
      }, {
        text: 'Sim',
        handler: () => {
          this.ownerService.deactivateOwner(id).subscribe(
            (res) => { alert("Exclusão feita com sucesso!"), this.router.navigate(['/menu']);  }, 
            (err) => console.log(err)
          );
        }
      }
      ]
    }).then(res => {
      res.present();
    });
  }
}
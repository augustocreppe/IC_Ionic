import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../core/services/owner.service';
import { OwnerInterface } from '../core/interfaces/owner.interface';
import { CreateOwnerInterface } from '../core/interfaces/create-owner.interface';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-p',
  templateUrl: './search-p.page.html',
  styleUrls: ['./search-p.page.scss'],
})

export class SearchPPage implements OnInit {
  owners: OwnerInterface[];
  ready = false;

  constructor(
    private loadingController: LoadingController,
    private ownerService: OwnerService,
    private router: Router
  ) { }

  ngOnInit() { }

  searchOwner(event) {
    const searchText = event.target.value;
    
    this.ownerService.getAllOwners(searchText).subscribe(
      (data) => {
        this.owners = data.body;
        console.log(this.owners)
        this.ready = true;
      }
    );
  }

  emailClick(email) {
    alert("Email: " + email);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})

export class ContaPage implements OnInit {
  imageChangedEvent = '';
  croppedImage = '';
  
  constructor() { }
  ngOnInit() { }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
    console.log("croppedImage:", this.croppedImage);
  }
}

import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { createWorker} from 'tesseract.js';
import { Router } from '@angular/router';

const { Camera } = Plugins;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})

export class CameraPage implements OnInit {
  worker: Tesseract.Worker;
  workerReady = false;

  image = '';
  imageChangedEvent = '';
  croppedImage: any = null;
  captureProgress = 0;
  ocrResult = '';

  constructor(private router: Router) { 
    this.loadWorker();
  }

  async ngOnInit() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
  
      this.image = image.dataUrl;
    }
    catch {
      this.router.navigate(['/menu']);
    }
  }

  async loadWorker() {
    this.worker = createWorker({
      logger: progress => {
        if (progress.status == 'recognizing text') {
          this.captureProgress = parseInt('' + progress.progress * 100);
        }
      }
    });
    await this.worker.load();
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');
    this.workerReady = true;
  }

  async captureImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
  
      this.image = image.dataUrl;
    }
    catch {
      this.router.navigate(['/menu']);
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image: any) {
    this.croppedImage = image;
  }
  
  async recognizeImage() {
    const result = await this.worker.recognize(this.croppedImage.base64);
    this.ocrResult = result.data.text;
    this.router.navigate(['/result/',this.ocrResult]);
  }
}

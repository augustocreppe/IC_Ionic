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
  ocrResult = '';
  captureProgress = 0;

  constructor(private router: Router) { 
    this.loadWorker();
  }

  async loadWorker() {
    this.worker = createWorker({
      logger: progress => {
        console.log(progress)
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
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    console.log('image: ', image);
    this.image = image.dataUrl;
  }

  async recognizeImage() {
    const result = await this.worker.recognize(this.image);
    console.log(result);
    this.ocrResult = result.data.text;
  }

  async ngOnInit() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    this.image = image.dataUrl;
    console.log('image: ', image);

    if(this.image == '')
    {
      this.router.navigate(['/menu']);
    }
  }

}

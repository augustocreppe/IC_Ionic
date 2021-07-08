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
  binaryData = '';

  red = 0.2126;
  green = 0.7152;
  blue = 0.0722;

  toGrayscale(context, w, h) {
    var imageData = context.getImageData(0, 0, w, h);
    var data = imageData.data;
    
    for(var i = 0; i < data.length; i += 4) {
      var brightness = this.red * data[i] + this.green * data[i + 1] + this.blue * data[i + 2];
      // red
      data[i] = brightness;
      // green
      data[i + 1] = brightness;
      // blue
      data[i + 2] = brightness;
    }
    
    // overwrite original image
    context.putImageData(imageData, 0, 0);
  };

  hist(context, w, h) {
    var imageData = context.getImageData(0, 0, w, h);
    var data = imageData.data;
    var brightness;
    var brightness256Val;
    var histArray = Array.apply(null, new Array(256)).map(Number.prototype.valueOf,0);
      
    for (var i = 0; i < data.length; i += 4) {
      brightness = this.red * data[i] + this.green * data[i + 1] + this.blue * data[i + 2];
      brightness256Val = Math.floor(brightness);
      histArray[brightness256Val] += 1;
    }
      
    return histArray;
  };

  otsu(histogram, total) {
    var sum = 0;
    for (var i = 1; i < 256; ++i)
        sum += i * histogram[i];
    var sumB = 0;
    var wB = 0;
    var wF = 0;
    var mB;
    var mF;
    var max = 0.0;
    var between = 0.0;
    var threshold1 = 0.0;
    var threshold2 = 0.0;
    for (var i = 0; i < 256; ++i) {
        wB += histogram[i];
        if (wB == 0)
            continue;
        wF = total - wB;
        if (wF == 0)
            break;
        sumB += i * histogram[i];
        mB = sumB / wB;
        mF = (sum - sumB) / wF;
        between = wB * wF * Math.pow(mB - mF, 2);
        if ( between >= max ) {
            threshold1 = i;
            if ( between > max ) {
                threshold2 = i;
            }
            max = between;            
        }
    }
    return ( threshold1 + threshold2 ) / 2.0;
  };

  binarize(threshold, context, w, h) {
    var imageData = context.getImageData(0, 0, w, h);
    var data = imageData.data;
    var val;
      
    for(var i = 0; i < data.length; i += 4) {
      var brightness = this.red * data[i] + this.green * data[i + 1] + this.blue * data[i + 2];
      val = ((brightness > threshold) ? 255 : 0);
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
     }
    
    context.putImageData(imageData, 0, 0);
  };

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

  handleOnLoad(canvas, ctx, img) {
    const w = img.width, h = img.height;
    canvas.height = h;     
    canvas.width = w;       
    ctx.drawImage(img, 0, 0);
    this.toGrayscale(ctx, w, h);
    const histogram = this.hist(ctx, w, h);
    const threshold = this.otsu(histogram, w*h);
    this.binarize(threshold, ctx, w, h);
  }

  async recognizeImage() {
    const result = await this.worker.recognize(this.croppedImage.base64);
    this.ocrResult = result.data.text;

    console.log("Resultado Bruto: ", this.ocrResult);

    const sanitized = this.ocrResult.replace(/(\r\n|\n|\r|' '|[^a-z A-Z 0-9])/gm,'');
    const regex = '^[a-zA-Z]{3}[0-9]{1}[a-zA-Z0-9]{1}[0-9]{2}$';
    const match = sanitized.match(regex);

    if(match) 
    {
      console.log("Resultado Limpo: ", sanitized);
      this.router.navigate(['/result/', sanitized]);
    } 
    else 
    {
      console.log("Resultado Limpo: ", sanitized);
      //this.router.navigate(['/result/', sanitized]);
    }
  }

  binarizeImage() {
    const canvas = document.getElementById('cancan') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const img = new Image;
    
    img.src = this.croppedImage.base64;
    img.onload = (event) => this.handleOnLoad(canvas, ctx, img);
    this.binaryData = canvas.toDataURL();

    this.croppedImage.base64 = this.binaryData;

    setTimeout(() => {  this.recognizeImage(); }, 500);
  }
}

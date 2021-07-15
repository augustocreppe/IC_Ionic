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

  blurRadius: any;
  blurKernelSize: any;
  blurKernel: any;
  blurMult: any;

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
    ctx.putImageData(this.preprocessImage(canvas), 0, 0);
  }

  async recognizeImage() {
    const binarized = await this.binarizeImage(this.croppedImage.base64);

    const result = await this.worker.recognize(binarized);
    this.ocrResult = result.data.text;

    console.log("Resultado Bruto: ", this.ocrResult);

    const sanitized = this.ocrResult.replace(/(\r\n|\n|\r|' '|'  '|'   '|[^a-z A-Z 0-9])/gm,'');
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

      const sanitized2 = this.ocrResult.replace(' ','');
      const match2 = sanitized2.match(regex);

      if(match2)
      {
        console.log("Resultado Limpo: ", sanitized2);
        this.router.navigate(['/result/', sanitized2]);
      }
      else
      {
        console.log("Resultado Limpo 2: ", sanitized2);
        //this.router.navigate(['/result/', sanitized]);
      }
    }
  }

  async binarizeImage(image) {
    const canvas = document.getElementById('cancan') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const img = new Image;

    img.src = image;
    img.onload = (event) => this.handleOnLoad(canvas, ctx, img);
    
    this.binaryData = canvas.toDataURL();
    return this.binaryData;
  }

  preprocessImage(canvas) {
    const processedImageData = canvas.getContext('2d').getImageData(0,0,canvas.width, canvas.height);
    this.blurARGB(processedImageData.data, canvas, 1);
    this.dilate(processedImageData.data, canvas);
    this.invertColors(processedImageData.data);
    this.thresholdFilter(processedImageData.data, 0.4);

    return processedImageData;
  }

  thresholdFilter(pixels, level) {
    if (level === undefined) {
        level = 0.5;
    }
    
    const thresh = Math.floor(level * 255);
    
    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        let val;
        if (gray >= thresh) {
            val = 255;
        } 
        else {
            val = 0;
        }
        pixels[i] = pixels[i + 1] = pixels[i + 2] = val;
    }
  }

  getARGB (data, i) {
    const offset = i * 4;
    return (
      ((data[offset + 3] << 24) & 0xff000000) |
      ((data[offset] << 16) & 0x00ff0000) |
      ((data[offset + 1] << 8) & 0x0000ff00) |
      (data[offset + 2] & 0x000000ff)
    );
  };

  setPixels (pixels, data) {
    let offset = 0;
    for (let i = 0, al = pixels.length; i < al; i++) {
        offset = i * 4;
        pixels[offset + 0] = (data[i] & 0x00ff0000) >>> 16;
        pixels[offset + 1] = (data[i] & 0x0000ff00) >>> 8;
        pixels[offset + 2] = data[i] & 0x000000ff;
        pixels[offset + 3] = (data[i] & 0xff000000) >>> 24;
    }
  };

  buildBlurKernel(r) {
    let radius = (r * 3.5) | 0;
    radius = radius < 1 ? 1 : radius < 248 ? radius : 248;

    if (this.blurRadius !== radius) {
        this.blurRadius = radius;
        this.blurKernelSize = (1 + this.blurRadius) << 1;
        this.blurKernel = new Int32Array(this.blurKernelSize);
        this.blurMult = new Array(this.blurKernelSize);
        
        for (let l = 0; l < this.blurKernelSize; l++) {
          this.blurMult[l] = new Int32Array(256);
        }

        let bk, bki;
        let bm, bmi;

        for (let i = 1, radiusi = radius - 1; i < radius; i++) {
            this.blurKernel[radius + i] = this.blurKernel[radiusi] = bki = radiusi * radiusi;
            bm = this.blurMult[radius + i];
            bmi = this.blurMult[radiusi--];

            for (let j = 0; j < 256; j++) {
                bm[j] = bmi[j] = bki * j;
            }
        }

        bk = this.blurKernel[radius] = radius * radius;
        bm = this.blurMult[radius];

        for (let k = 0; k < 256; k++) {
            bm[k] = bk * k;
        }
    }
  }

  blurARGB(pixels, canvas, radius) {
    const width = canvas.width;
    const height = canvas.height;
    const numPackedPixels = width * height;
    const argb = new Int32Array(numPackedPixels);
    
    for (let j = 0; j < numPackedPixels; j++) {
        argb[j] = this.getARGB(pixels, j);
    }

    let sum, cr, cg, cb, ca;
    let read, ri, ym, ymi, bk0;
    const a2 = new Int32Array(numPackedPixels);
    const r2 = new Int32Array(numPackedPixels);
    const g2 = new Int32Array(numPackedPixels);
    const b2 = new Int32Array(numPackedPixels);
    let yi = 0;
    this.buildBlurKernel(radius);
    let x, y, i;
    let bm;

    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            cb = cg = cr = ca = sum = 0;
            read = x - this.blurRadius;
            
            if (read < 0) { bk0 = -read; read = 0; } 
            else { if (read >= width) { break; } bk0 = 0; }
    
            for (i = bk0; i < this.blurKernelSize; i++) {
                if (read >= width) { break; }
                const c = argb[read + yi];
                bm = this.blurMult[i];
                ca += bm[(c & -16777216) >>> 24];
                cr += bm[(c & 16711680) >> 16];
                cg += bm[(c & 65280) >> 8];
                cb += bm[c & 255];
                sum += this.blurKernel[i];
                read++;
            }

            ri = yi + x;
            a2[ri] = ca / sum;
            r2[ri] = cr / sum;
            g2[ri] = cg / sum;
            b2[ri] = cb / sum;
        }

        yi += width;
    }

    yi = 0;
    ym = -this.blurRadius;
    ymi = ym * width;

    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            cb = cg = cr = ca = sum = 0;

            if (ym < 0) {
                bk0 = ri = -ym;
                read = x;
            } 
            else {
                if (ym >= height) {
                    break;
                }
                bk0 = 0;
                ri = ym;
                read = x + ymi;
            }

            for (i = bk0; i < this.blurKernelSize; i++) {
                if (ri >= height) {
                    break;
                }

                bm = this.blurMult[i];
                ca += bm[a2[read]];
                cr += bm[r2[read]];
                cg += bm[g2[read]];
                cb += bm[b2[read]];
                sum += this.blurKernel[i];
                ri++;
                read += width;
            }

            argb[x + yi] =
            ((ca / sum) << 24) |
            ((cr / sum) << 16) |
            ((cg / sum) << 8) |
            (cb / sum);
        }

        yi += width;
        ymi += width;
        ym++;
    }

    this.setPixels(pixels, argb);
  }

  invertColors(pixels) {
    for (var i = 0; i < pixels.length; i+= 4) {
        pixels[i] = pixels[i] ^ 255; // Invert Red
        pixels[i+1] = pixels[i+1] ^ 255; // Invert Green
        pixels[i+2] = pixels[i+2] ^ 255; // Invert Blue
    }
  }

  dilate(pixels, canvas) {
    let currIdx = 0;
    const maxIdx = pixels.length ? pixels.length / 4 : 0;
    const out = new Int32Array(maxIdx);
    let currRowIdx, maxRowIdx, colOrig, colOut, currLum;

    let idxRight, idxLeft, idxUp, idxDown;
    let colRight, colLeft, colUp, colDown;
    let lumRight, lumLeft, lumUp, lumDown;

    while (currIdx < maxIdx) {
        currRowIdx = currIdx;
        maxRowIdx = currIdx + canvas.width;
        
        while (currIdx < maxRowIdx) {
            colOrig = colOut = this.getARGB(pixels, currIdx);
            idxLeft = currIdx - 1;
            idxRight = currIdx + 1;
            idxUp = currIdx - canvas.width;
            idxDown = currIdx + canvas.width;

            if (idxLeft < currRowIdx) {
                idxLeft = currIdx;
            }
            if (idxRight >= maxRowIdx) {
                idxRight = currIdx;
            }
            if (idxUp < 0) {
                idxUp = 0;
            }
            if (idxDown >= maxIdx) {
                idxDown = currIdx;
            }
            colUp = this.getARGB(pixels, idxUp);
            colLeft = this.getARGB(pixels, idxLeft);
            colDown = this.getARGB(pixels, idxDown);
            colRight = this.getARGB(pixels, idxRight);

            //compute luminance
            currLum =
                77 * ((colOrig >> 16) & 0xff) +
                151 * ((colOrig >> 8) & 0xff) +
                28 * (colOrig & 0xff);
            lumLeft =
                77 * ((colLeft >> 16) & 0xff) +
                151 * ((colLeft >> 8) & 0xff) +
                28 * (colLeft & 0xff);
            lumRight =
                77 * ((colRight >> 16) & 0xff) +
                151 * ((colRight >> 8) & 0xff) +
                28 * (colRight & 0xff);
            lumUp =
                77 * ((colUp >> 16) & 0xff) +
                151 * ((colUp >> 8) & 0xff) +
                28 * (colUp & 0xff);
            lumDown =
                77 * ((colDown >> 16) & 0xff) +
                151 * ((colDown >> 8) & 0xff) +
                28 * (colDown & 0xff);

            if (lumLeft > currLum) {
                colOut = colLeft;
                currLum = lumLeft;
            }
            if (lumRight > currLum) {
                colOut = colRight;
                currLum = lumRight;
            }
            if (lumUp > currLum) {
                colOut = colUp;
                currLum = lumUp;
            }
            if (lumDown > currLum) {
                colOut = colDown;
                currLum = lumDown;
            }
            out[currIdx++] = colOut;
        }
  }
  this.setPixels(pixels, out);
  };
}
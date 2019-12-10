import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { AlertController, LoadingController } from "@ionic/angular";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecognisedPlates } from './RecognisedPlates';

@Component({
  selector: "app-scan",
  templateUrl: "scan.component.html"
})
export class ScanComponent implements OnInit {
  private cameraOptions: CameraOptions;
  private recognisedPlates: string[];
  private loadingInformation;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private camera: Camera,
    private alertController: AlertController)
  {
    this.cameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      cameraDirection: this.camera.Direction.BACK,
      correctOrientation: true
    };
  }

  ngOnInit() {}

  scan(input: string) {
    this.cameraOptions.sourceType =
      input === "camera"
        ? this.camera.PictureSourceType.CAMERA
        : this.camera.PictureSourceType.PHOTOLIBRARY;

    this.camera.getPicture(this.cameraOptions)
      .then((imageData) => {
        this.recognisePlates(imageData);
      })
      .catch((error) => {
        this.showResultAlert('ERROR en el scan o la cámara');
      });
  }

  async showResultAlert(msg: string) {
    const alert = await this.alertController.create({
        header: '¡Resultados!',
        message: msg,
        buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                  alert.dismiss();
              },
            }
        ],
    });

    await alert.present();
  }

  async showLoadingInformation() {
    this.loadingInformation = this.loadingController.create({
      spinner: 'circles',
      message: 'Procesando imagen...',
      translucent: true,
    })
    .then((res) => {
      res.present();

      res.onDidDismiss();
    })
  }

  async stopLoadingInformation() {
    await this.loadingController.dismiss();
  }

  recognisePlates(image) {
    this.showLoadingInformation();
    var secret_key = "sk_b8870cd7fb7111d8c44b21c6";
    var url = "https://api.openalpr.com/v2/recognize_bytes?recognize_vehicle=1&country=eu&secret_key=" + secret_key;
    var xhr = new XMLHttpRequest();

    xhr.open("POST", url);
    xhr.send(image);

    var candidatePlates: string[] = [];
      
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var jsonResponse = JSON.parse(xhr.responseText);
        var results = jsonResponse.results[0];
        results.candidates.forEach(candidate => {
          candidatePlates.push(candidate.plate);
        });

        RecognisedPlates.RecognisedPlates = candidatePlates;
        this.stopLoadingInformation();
        this.router.navigateByUrl('main/checker/scan/choose-plate');
      }
    }
  }
}
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}
  async presentAlert(text: string) {
    const alert = await this.alertController.create({
      header: 'Message',
      message: text,
      buttons: ['OK'],
    });

    await alert.present();
  }
}

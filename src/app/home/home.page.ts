import { TituloAppService } from './../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private location: Location,
    private tituloAppService: TituloAppService,
    private navCtrl: NavController
  ) {}
  ngOnInit(): void {}
  goBack() {
    this.navCtrl.back({ animationDirection: 'back' });

    this.tituloAppService.back();
  }
  verificarSiEstaEnHome(): boolean {
    const url = this.location.path();
    return url === '/home/inicio';
  }
}

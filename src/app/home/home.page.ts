import { MenuService } from './../services/menu/menu.service';
import { TokenService } from './../services/token/token.service';
import { TituloAppService } from './../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public user: any;
  constructor(
    private location: Location,
    private tituloAppService: TituloAppService,
    private navCtrl: NavController,
    private tokenService: TokenService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.menuService.user$.subscribe((menus) => {
      this.user = this.tokenService.decodeToken();
    });
  }
  goBack() {
    this.navCtrl.back({ animationDirection: 'back' });

    this.tituloAppService.back();
  }
  verificarSiEstaEnHome(): boolean {
    const url = this.location.path();
    return url === '/home/inicio';
  }
  optenerImgUser() {
    this.user = this.tokenService.decodeToken();
  }
}

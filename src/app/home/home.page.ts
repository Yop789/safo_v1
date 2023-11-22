import { MenuService } from './../services/menu/menu.service';
import { TokenService } from './../services/token/token.service';
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
  public avatar = '';
  public name = '';
  constructor(
    private location: Location,
    private tituloAppService: TituloAppService,
    private navCtrl: NavController,
    private tokenService: TokenService,
    private menuService: MenuService
  ) {}
  ngOnInit(): void {
    this.menuService.user$.subscribe((menus) => {
      const user = this.tokenService.decodeToken();
      this.avatar = user.avatar || '';
      this.name = user.name || '';
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
    const user = this.tokenService.decodeToken();
    this.avatar = '' + user.avatar;
    this.name = '' + user.name;
  }
}

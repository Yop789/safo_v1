import { TituloAppService } from './../services/titulo-app.service';
import { Component } from '@angular/core';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  component = InicioSesionComponent;
  constructor(
    private location: Location,
    private tituloAppService: TituloAppService
  ) {}

  goBack() {
    this.location.back();
    this.tituloAppService.back();
  }
  verificarSiEstaEnHome(): boolean {
    const url = this.location.path();
    return url === '/home/inicio';
  }
}

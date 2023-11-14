import { TokenService } from './../token/token.service';
import { InicioComponent } from './../../home/inicio/inicio.component';
import { Menu } from './../../models/menu';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public inisiarSesion: Menu[] = [
    {
      name: 'iniciosesio',
      url: 'iniciosesio',
      icon: 'log-in-outline',
    },
    {
      name: 'Registro',
      url: 'usuOpc',
      icon: 'person-add-outline',
    },
  ];
  public defaul: Menu[] = [
    {
      name: 'preguntas',
      url: '#',
      icon: 'help-outline',
    },
    {
      name: 'acerca',
      url: '#',
      icon: 'alert-outline',
    },
  ];
  public client: Menu[] = [
    {
      name: 'client',
      url: 'client',
      icon: 'megaphone-outline',
    },
  ];
  public admin: Menu[] = [
    {
      name: 'admin',
      url: 'admin',
      icon: 'key-outline',
    },
  ];

  constructor(private tokenService: TokenService) {}

  public getMenus(): any {
    const rol = this.tokenService.decodeToken().rol.name;
    if (rol === '') {
      console.log('rol');
      return [...this.inisiarSesion, ...this.defaul];
    } else if (rol === 'Client') {
      return [...this.client, ...this.defaul];
    } else if (rol === 'admin') {
      return [...this.admin, ...this.defaul];
    } else if (rol === 'foraneo') {
      return this.defaul;
    }
  }
}

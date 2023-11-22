import { TokenService } from './../token/token.service';
import { InicioComponent } from './../../home/inicio/inicio.component';
import { Menu } from './../../models/menu';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private userSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public user$: Observable<string> = this.userSubject.asObservable();

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
      name: 'Ruleta',
      url: 'ruleta',
      icon: 'shuffle-outline',
    },
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
  public logaut: Menu[] = [
    {
      name: 'salir',
      url: 'salir',
      icon: 'log-out-outline',
    },
  ];

  public client: Menu[] = [
    {
      name: 'client',
      url: 'client',
      icon: 'megaphone-outline',
    },
    {
      name: 'Administración de Tiendas',
      url: 'client/tienda',
      icon: 'storefront-outline',
    },
  ];
  public admin: Menu[] = [
    {
      name: 'admin',
      url: 'admin',
      icon: 'key-outline',
    },
  ];
  public foraneo: Menu[] = [
    {
      name: 'Publicaciones',
      url: 'publicaciones',
      icon: 'albums-outline',
    },
  ];

  constructor(private tokenService: TokenService) {}

  setUser(username: string): void {
    this.userSubject.next(username);
  }

  public getMenus(): any {
    const rol = this.tokenService.decodeToken().rol.name;
    if (rol === '') {
      return [...this.inisiarSesion, ...this.defaul];
    } else if (rol === 'Client') {
      return [...this.client, ...this.defaul, ...this.logaut];
    } else if (rol === 'Admin') {
      return [...this.admin, ...this.defaul, ...this.logaut];
    } else if (rol === 'foraneo') {
      return [...this.foraneo, ...this.defaul, ...this.logaut];
    }
  }
}

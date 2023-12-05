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
  public inicio: Menu[] = [
    {
      name: 'Inicio',
      url: '',
      icon: 'home-outline',
    },
  ];
  public inisiarSesion: Menu[] = [
    {
      name: 'Iniciar Sesión',
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
      name: 'Tiendas',
      url: 'tiendas',
      icon: 'storefront-outline',
    },
    {
      name: 'Ruleta',
      url: 'ruleta',
      icon: 'shuffle-outline',
    },
    {
      name: 'Preguntas',
      url: 'preguntas',
      icon: 'help-outline',
    },
    {
      name: 'Acerca',
      url: 'acerca',
      icon: 'alert-outline',
    },
  ];
  public logaut: Menu[] = [
    {
      name: 'Salir',
      url: 'salir',
      icon: 'log-out-outline',
    },
  ];

  public client: Menu[] = [
    // {
    //   name: 'client',
    //   url: 'client',
    //   icon: 'megaphone-outline',
    // },
    {
      name: 'Administración de Tiendas',
      url: 'client/tienda',
      icon: 'business-outline',
    },
    {
      name: 'Publicidad',
      url: 'client/publicidad',
      icon: 'clipboard-outline',
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
    {
      name: 'Agregar resetas',
      url: 'agregar-receta',
      icon: 'book-outline',
    },
    {
      name: 'Recetas Favoritas',
      url: 'favorit-receta',
      icon: 'attach-outline',
    },
    {
      name: 'Tiendas Favoritas',
      url: 'favorit-store',
      icon: 'attach-outline',
    },
  ];

  constructor(private tokenService: TokenService) {}

  setUser(username: string): void {
    this.userSubject.next(username);
  }

  public getMenus(): any {
    const rol = this.tokenService.decodeToken().rol.name;
    if (rol === '') {
      return [...this.inisiarSesion, ...this.inicio, ...this.defaul];
    } else if (rol === 'Client') {
      return [...this.inicio, ...this.client, ...this.defaul, ...this.logaut];
    } else if (rol === 'Admin') {
      return [...this.inicio, ...this.admin, ...this.defaul, ...this.logaut];
    } else if (rol === 'foraneo') {
      return [...this.inicio, ...this.foraneo, ...this.defaul, ...this.logaut];
    }
  }
}

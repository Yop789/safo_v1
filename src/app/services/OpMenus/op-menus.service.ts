import { OpMenu } from './../../models/op-menu';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OpMenusService {
  constructor() {}

  defalt: OpMenu[] = [
    { clic: '', nameIcon: 'help-outline', textName: 'Preguntas Frecuentes' },
    { clic: '', nameIcon: 'alert-outline', textName: 'Acerca de' },
  ];
  inicio_sesion: OpMenu[] = [
    {
      clic: 'iniciosesio',
      nameIcon: 'log-in-outline',
      textName: 'Iniciar Sesión',
    },
    { clic: 'usuOpc', nameIcon: 'person-add-outline', textName: 'Registrarse' },
  ];
  client: OpMenu[] = [
    { clic: 'client', nameIcon: 'megaphone-outline', textName: 'Client' },
  ];
  admin: OpMenu[] = [
    { clic: 'admin', nameIcon: 'key-outline', textName: 'Admin' },
  ];
}

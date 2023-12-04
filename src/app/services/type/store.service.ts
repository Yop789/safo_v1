import { Type } from './../../models/type';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypeStoreService {
  public type: Type[] = [
    {
      name: 'Abarrotes',
      icon: 'storefront',
    },
    {
      name: 'Bancos',
      icon: 'account_balance_wallet',
    },
    {
      name: 'Tecnología',
      icon: 'computer',
    },
    {
      name: 'Peluquerías',
      icon: 'style',
    },
    {
      name: 'Hospital',
      icon: 'local_hospital',
    },
    {
      name: 'Cafeterías',
      icon: 'restaurant',
    },
    {
      name: 'Tienda De Ropa',
      icon: 'checkroom',
    },
    {
      name: 'Tienda De Electrónica',
      icon: 'developer_board',
    },
    {
      name: 'Tienda De Mascotas',
      icon: 'pets',
    },
    {
      name: 'Tienda De Artículos De Limpieza',
      icon: 'clean_hands',
    },
    {
      name: 'Tienda De Artículos De Belleza',
      icon: 'face_unlock',
    },
  ];
  constructor() {}

  public getTypes(): Type[] {
    return this.type;
  }
  public setTypes(types: Type[]): void {
    this.type = types;
  }
}

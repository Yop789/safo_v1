import { StoreService } from './../../services/api/store.service';
import { TituloAppService } from './../../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-tiendas-favoritas',
  templateUrl: './mis-tiendas-favoritas.component.html',
  styleUrls: ['./mis-tiendas-favoritas.component.scss'],
})
export class MisTiendasFavoritasComponent implements OnInit {
  items: any[] = [];

  imageLoaded: boolean[] = [];

  constructor(
    private tituloAppService: TituloAppService,
    private storeService: StoreService
  ) {
    this.tituloAppService.titulo = 'Mis Tiendas Favoritas';
  }
  ionViewDidEnter() {
    this.getStoreFavorit(); // Llama a una función que carga los datos
  }
  ngOnInit() {}

  onImageLoad(index: number): void {
    this.imageLoaded[index] = true;
  }
  calificacionPromedio(data: any) {
    return data.length > 0
      ? data.reduce(
          (acumulador, objeto) => acumulador + objeto.qualification,
          0
        ) / data.length
      : 0;
  }
  getStoreFavorit() {
    this.storeService
      .getStoreFavoritByUser()
      .subscribe((data: any) => (this.items = data));
  }
}

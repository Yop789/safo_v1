import { RecetaService } from './../../services/receta.service';
import { TituloAppService } from './../../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-resetas-favoritas',
  templateUrl: './mis-resetas-favoritas.component.html',
  styleUrls: ['./mis-resetas-favoritas.component.scss'],
})
export class MisResetasFavoritasComponent implements OnInit {
  items: any[] = [];
  imageLoaded: boolean[] = [];
  constructor(
    private tituloAppService: TituloAppService,
    private recetaService: RecetaService
  ) {
    this.tituloAppService.titulo = 'Mis Recetas Favoritas';
  }
  ionViewDidEnter() {
    this.getResetFavorit(); // Llama a una función que carga los datos
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
  getResetFavorit() {
    this.recetaService
      .getResetFavoritByUser()
      .subscribe((data: any) => (this.items = data));
  }
}

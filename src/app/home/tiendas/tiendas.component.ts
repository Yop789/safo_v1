import { TituloAppService } from 'src/app/services/titulo-app.service';
import { StoreService } from './../../services/api/store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.scss'],
})
export class TiendasComponent implements OnInit {
  items: any[] = [];
  paginaActual = 1;
  cantidadPorPagina = 2;
  cantidadDePagina = 0;

  constructor(
    private storeService: StoreService,
    private tituloAppService: TituloAppService
  ) {}

  ngOnInit() {
    this.tituloAppService.titulo = 'Tiendas';
    this.getDtaStore();
  }

  estrella(data: any) {
    if (data.length > 0) {
      let sumaCalificaciones = data.reduce(
        (acumulador, objeto) => acumulador + objeto.qualification,
        0
      );
      return sumaCalificaciones / data.length;
    } else {
      return 0;
    }
  }

  getDtaStore() {
    this.storeService
      .getStorePorPagincion(this.paginaActual, this.cantidadPorPagina)
      .subscribe(
        (data: any) => {
          this.cantidadDePagina = data.totalPages;
          this.items = this.items.concat(data.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  cargarMasDatos() {
    this.paginaActual++;
    this.getDtaStore();
  }
}

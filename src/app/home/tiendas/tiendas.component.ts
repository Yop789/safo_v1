import { TituloAppService } from 'src/app/services/titulo-app.service';
import { StoreService } from './../../services/api/store.service';
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.scss'],
})
export class TiendasComponent implements OnInit {
  items: any[] = [];
  paginaActual = 1;
  cantidadPorPagina = 2;
  cantidadDePaginas = 0;
  imageLoaded: boolean[] = [];
  searchTerm: string = '';

  constructor(
    private storeService: StoreService,
    private tituloAppService: TituloAppService
  ) {}

  ngOnInit() {
    this.predeterminarVariables();
    this.tituloAppService.titulo = 'Tiendas';
    this.getDtaStore();
  }

  calificacionPromedio(data: any) {
    return data.length > 0
      ? data.reduce(
          (acumulador, objeto) => acumulador + objeto.qualification,
          0
        ) / data.length
      : 0;
  }

  getDtaStore() {
    this.storeService
      .getStorePorPagincion(this.paginaActual, this.cantidadPorPagina)
      .subscribe(
        (data: any) => {
          this.cantidadDePaginas = data.totalPages;
          this.items = this.items.concat(data.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  cargarMasDatos() {
    this.paginaActual++;
    this.searchTerm === ''
      ? this.getDtaStore()
      : this.getPagFilterStoreScroll();
  }

  onIonInfinite(ev: any) {
    this.cargarMasDatos();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  onImageLoad(index: number): void {
    this.imageLoaded[index] = true;
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;

    if (this.searchTerm.length > 1) {
      this.predeterminarVariables();
      this.getPagFilterStore();
    } else {
      this.predeterminarVariables();
      this.searchTerm = '';
      this.getDtaStore();
    }
  }

  predeterminarVariables() {
    this.paginaActual = 1;
    this.cantidadPorPagina = 2;
    this.cantidadDePaginas = 0;
    this.items = [];
  }

  getPagFilterStore() {
    this.storeService
      .getFilterPageStore(this.paginaActual, this.searchTerm)
      .subscribe((data: any) => {
        this.cantidadDePaginas = data.totalPages;
        this.items = data.data;
      });
  }
  getPagFilterStoreScroll() {
    this.storeService
      .getFilterPageStore(this.paginaActual, this.searchTerm)
      .subscribe((data: any) => {
        this.cantidadDePaginas = data.totalPages;
        this.items = [...this.items, ...data.data];
      });
  }
}

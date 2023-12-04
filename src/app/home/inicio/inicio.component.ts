import { RecetaService } from './../../services/receta.service';
import { TituloAppService } from './../../services/titulo-app.service';
import { AuthService } from './../../services/auth.service';
import { TokenService } from './../../services/token/token.service';
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  items: any[] = [];
  paginaActual = 1;
  cantidadPorPagina = 2;
  cantidadDePaginas = 0;
  imageLoaded: boolean[] = [];
  searchTerm: string = '';

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private tituloAppService: TituloAppService,
    private recetaService: RecetaService
  ) {}

  ngOnInit() {
    this.predeterminarVariables();
    this.authService.authServer();
    this.tituloAppService.titulo = 'Inicio';
    this.getRecetas();
  }

  calificacionPromedio(data: any) {
    return data.length > 0
      ? data.reduce(
          (acumulador, objeto) => acumulador + objeto.qualification,
          0
        ) / data.length
      : 0;
  }

  getRecetas() {
    this.recetaService
      .getRecetaPorPagincion(this.paginaActual, this.cantidadPorPagina)
      .subscribe((data: any) => {
        this.cantidadDePaginas = data.totalPages;
        this.items = [...this.items, ...data.data];
      });
  }

  cargarMasDatos() {
    this.paginaActual++;
    this.searchTerm === '' ? this.getRecetas() : this.getPagFilterResetScroll();
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
      this.getPagFilterReset();
    } else {
      this.predeterminarVariables();
      this.searchTerm = '';
      this.getRecetas();
    }
  }

  predeterminarVariables() {
    this.paginaActual = 1;
    this.cantidadPorPagina = 2;
    this.cantidadDePaginas = 0;
    this.items = [];
  }

  getPagFilterReset() {
    this.recetaService
      .getFilterPageReset(this.paginaActual, this.searchTerm)
      .subscribe((data: any) => {
        this.cantidadDePaginas = data.totalPages;
        this.items = data.data;
      });
  }
  getPagFilterResetScroll() {
    this.recetaService
      .getFilterPageReset(this.paginaActual, this.searchTerm)
      .subscribe((data: any) => {
        this.cantidadDePaginas = data.totalPages;
        this.items = [...this.items, ...data.data];
      });
  }
}

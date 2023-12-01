import { RecetaService } from './../../services/receta.service';
import { TituloAppService } from './../../services/titulo-app.service';
import { AuthService } from './../../services/auth.service';
import { TokenService } from './../../services/token/token.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private tituloAppService: TituloAppService,
    private recetaService: RecetaService
  ) {}
  ionViewDidEnter() {
    this.paginaActual = 1;
    this.cantidadPorPagina = 2;
    this.cantidadDePaginas = 0;
    this.items = [];
    this.authService.authServer();
    this.tituloAppService.titulo = 'Inicio';
    this.getRecetas();
  }
  ngOnInit() {}
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
  getRecetas() {
    this.recetaService
      .getRecetaPorPagincion(this.paginaActual, this.cantidadPorPagina)
      .subscribe((data: any) => {
        this.cantidadDePaginas = data.totalPages;
        this.items = this.items.concat(data.data);
      });
  }
  cargarMasDatos() {
    this.paginaActual++;
    this.getRecetas();
  }
}

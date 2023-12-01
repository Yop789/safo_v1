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
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private tituloAppService: TituloAppService
  ) {}
  ionViewDidEnter() {
    this.authService.authServer();
    this.tituloAppService.titulo = 'Inicio';
  }
  ngOnInit() {}
}

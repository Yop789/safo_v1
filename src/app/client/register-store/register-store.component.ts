import { TituloAppService } from 'src/app/services/titulo-app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.scss'],
})
export class RegisterStoreComponent implements OnInit {
  constructor(private tituloAppService: TituloAppService) {}

  ngOnInit() {
    this.tituloAppService.titulo = 'Registro de Tiendas';
  }
}

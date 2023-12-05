import { TituloAppService } from './../../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acerca-nosotros',
  templateUrl: './acerca-nosotros.component.html',
  styleUrls: ['./acerca-nosotros.component.scss'],
})
export class AcercaNosotrosComponent implements OnInit {
  constructor(private tituloAppService: TituloAppService) {
    tituloAppService.titulo = 'Acerca de nosotros';
  }

  ngOnInit() {}
}

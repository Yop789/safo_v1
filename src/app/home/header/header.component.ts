import { TituloAppService } from './../../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //variables
  titulo = '';

  constructor(private tituloAppService: TituloAppService) {
    this.tituloAppService.titulo$.subscribe((titulo) => {
      this.titulo = titulo;
    });
  }

  ngOnInit() {}
}

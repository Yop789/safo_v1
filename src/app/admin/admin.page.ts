import { TituloAppService } from './../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  constructor(private tituloAppService: TituloAppService) {}

  ngOnInit() {
    this.tituloAppService.titulo = 'Admin';
  }
}

import { Component, OnInit } from '@angular/core';
import { TituloAppService } from '../services/titulo-app.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
  constructor(private tituloAppService: TituloAppService) {}

  ngOnInit() {
    this.tituloAppService.titulo = 'Client';
  }
}

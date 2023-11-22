import { Router } from '@angular/router';
import { TituloAppService } from './../../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  public items = ['item1', 'item', 'item2', 'item', 'item2', 'item'];
  constructor(
    private tituloAppService: TituloAppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tituloAppService.titulo = 'Administración de Tiendas';
  }
  registerStore() {
    this.router.navigate(['/home/client/register-tienda']);
  }
}

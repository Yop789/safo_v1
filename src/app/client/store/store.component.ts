import { TypeStoreService } from './../../services/type/store.service';
import { Type } from './../../models/type';
import { StoreService } from './../../services/api/store.service';
import { Store } from './../../models/store';
import { Router } from '@angular/router';
import { TituloAppService } from './../../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  public items: Store[] = [];
  private type: Type[];
  constructor(
    private tituloAppService: TituloAppService,
    private router: Router,
    private storeService: StoreService,
    private typeStoreService: TypeStoreService
  ) {
    this.tituloAppService.titulo = 'Administración de Tiendas';
    this.storeService.getStoreByIdUser().subscribe((stores: any) => {
      this.items = stores;
    });
    this.type = this.typeStoreService.getTypes();
  }

  ngOnInit() {}
  registerStore() {
    this.router.navigate(['/home/client/register-tienda']);
  }
  getIconName(category: string): string | undefined {
    const type: Type | undefined = this.type.find(
      (item) => item.name === category
    );

    // Si se encuentra el tipo, se retorna el icono; de lo contrario, se retorna undefined
    return type ? type.icon : undefined;
  }
}

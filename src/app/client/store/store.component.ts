import { AlertService } from './../../services/alert/alert.service';
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
  idStore;
  isActionSheetOpen = false;
  public actionSheetButtons = [
    {
      text: 'Eliminar',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Ver',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Editar',
      data: {
        action: 'edit',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
  public items: Store[] = [];
  private type: Type[];
  constructor(
    private tituloAppService: TituloAppService,
    private router: Router,
    private storeService: StoreService,
    private typeStoreService: TypeStoreService,
    private alertService: AlertService
  ) {
    this.tituloAppService.titulo = 'Administración de Tiendas';

    this.type = this.typeStoreService.getTypes();
  }

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.storeService.getStoreByIdUser().subscribe((stores: any) => {
      this.items = stores;
    });
  }
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
  action(ev) {
    this.isActionSheetOpen = false;
    console.log(ev.detail.data.action);
    switch (ev.detail.data.action) {
      case 'edit':
        this.router.navigate(['/home/client/edit-tienda', ev.detail.id]);
        break;
      case 'cancel':
        this.idStore = '';
        break;
      case 'delete':
        this.eliminar();
        console.log('delete');
        break;
      default:
        break;
    }
  }
  open(id) {
    this.isActionSheetOpen = true;
    this.idStore = id;
    // console.log(id);
  }
  eliminar() {
    this.storeService.deleteStoreByID(this.idStore).subscribe((res: any) => {
      this.alertService.presentAlert(res.message);
      this.getData();
    });
    this.idStore = '';
  }
}

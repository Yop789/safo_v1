import { AlertService } from './../../services/alert/alert.service';
import { AdvertisementService } from './../../services/advertisement.service';
import { TituloAppService } from './../../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.scss'],
})
export class PublicidadComponent implements OnInit {
  isActionSheetOpen = false;
  publicidad: any[] = [];
  idStore: string;
  idPublicidad: string;
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
    // {
    //   text: 'Editar',
    //   data: {
    //     action: 'edit',
    //   },
    // },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
  constructor(
    private router: Router,
    private tituloAppService: TituloAppService,
    private advertisementService: AdvertisementService,
    private alertService: AlertService
  ) {}
  ionViewDidEnter() {
    this.tituloAppService.titulo = 'Publicidades';
    this.get();
  }

  ngOnInit() {}
  action(ev) {
    this.isActionSheetOpen = false;
    switch (ev.detail.data.action) {
      case 'cancel':
        break;
      case 'share':
        this.router.navigate(['home/client/view-tienda', this.idStore]);
        break;
      case 'delete':
        this.deletePubli();
        break;
      default:
        break;
    }
  }
  registerPubli() {
    this.router.navigate(['/home/client/agregar-publicidad']);
  }
  get() {
    this.advertisementService
      .getPublicidadByUser()
      .subscribe((publicidad) => (this.publicidad = publicidad));
  }
  open(idStore, idPublicidad) {
    this.isActionSheetOpen = true;
    this.idStore = idStore;
    this.idPublicidad = idPublicidad;
    // console.log(id);
  }
  deletePubli() {
    this.advertisementService.deletePublicidad(this.idPublicidad).subscribe(
      (data) => {
        this.get();
        this.alertService.presentAlert('Publicidad eliminada');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

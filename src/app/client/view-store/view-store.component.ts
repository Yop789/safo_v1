import { AlertService } from './../../services/alert/alert.service';
import { TokenService } from './../../services/token/token.service';
import { TituloAppService } from './../../services/titulo-app.service';
import { StoreService } from './../../services/api/store.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalificarStoreComponent } from '../calificar-store/calificar-store.component';
import { ModalController } from '@ionic/angular';
import { MapaViewStoreComponent } from '../mapa-view-store/mapa-view-store.component';

@Component({
  selector: 'app-view-store',
  templateUrl: './view-store.component.html',
  styleUrls: ['./view-store.component.scss'],
})
export class ViewStoreComponent implements OnInit {
  idStore: any;
  imageUrl: any;
  lng: number;
  data: any;
  lat: number;
  starRating = 0;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private tituloAppService: TituloAppService,
    private modalCtrl: ModalController,
    private tokenService: TokenService,
    private alertService: AlertService
  ) {}
  ionViewDidEnter() {
    this.getStoreBy();
    this.tituloAppService.titulo = 'Detalles de la tienda';
  }
  ngOnInit() {}
  getStoreBy() {
    this.idStore = this.route.snapshot.params['id'];
    this.storeService.getStoreByID(this.idStore).subscribe((data: any) => {
      this.data = data;
      this.estrellas();
      this.imageUrl = data.image;
    });
  }
  async openModalInstrucciones() {
    const user = this.tokenService.decodeToken();
    if (user._id) {
      const modal = await this.modalCtrl.create({
        component: CalificarStoreComponent,
        componentProps: {
          Calif: { idStore: this.idStore }, // Pasa tu lista de ingredientes aquí
        },
      });
      modal.present();
      const { data, role } = await modal.onWillDismiss();
      if (role != 'confirm') {
        this.getStoreBy();
      }
    } else {
      this.alertService.presentAlert('Debes iniciar sesión para calificar');
    }
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: MapaViewStoreComponent,
      componentProps: {
        Calif: { lat: this.data.lat, log: this.data.log }, // Pasa tu lista de ingredientes aquí
      },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }
  estrellas() {
    let sumaCalificaciones = this.data.qualification.reduce(
      (acumulador, objeto) => acumulador + objeto.qualification,
      0
    );
    this.starRating = sumaCalificaciones / this.data.qualification.length;
  }
}

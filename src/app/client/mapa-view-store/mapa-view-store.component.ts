import mapboxgl from 'mapbox-gl';
import { MapboxService } from './../../services/mapbox/mapbox.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-mapa-view-store',
  templateUrl: './mapa-view-store.component.html',
  styleUrls: ['./mapa-view-store.component.scss'],
})
export class MapaViewStoreComponent implements OnInit {
  data: any;
  constructor(
    private mapboxService: MapboxService,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {
    this.data = this.navParams.get('Calif');
  }
  ionViewDidEnter() {
    this.buildMap();
  }
  ngOnInit() {
    // Agregar un evento de escucha para capturar la ubicación seleccionada
  }
  buildMap() {
    const map = this.mapboxService.mapaViewStore(this.data.lat, this.data.log);
    const marker = new mapboxgl.Marker({
      color: '#314ccd',
    });
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }
}

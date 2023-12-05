import { MapboxService } from './../../services/mapbox/mapbox.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  name: string;
  lng: number;
  lat: number;
  constructor(
    private modalCtrl: ModalController,
    private mapboxService: MapboxService,
    public navParams: NavParams
  ) {
    this.lat = this.navParams.get('lat');
    this.lng = this.navParams.get('lng');
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss({ lat: this.lat, lng: this.lng }, 'confirm');
  }
  ionViewDidEnter() {
    this.buildMap();
  }

  ngOnInit() {}
  buildMap() {
    if (!this.lat) {
      const map = this.mapboxService.initializeMap();
      const marker = new mapboxgl.Marker({
        color: '#314ccd',
      });
      // Agregar un evento de escucha para capturar la ubicación seleccionada
      map.on('click', (event) => {
        // Use the returned LngLat object to set the marker location
        // https://docs.mapbox.com/mapbox-gl-js/api/#lnglat
        marker.setLngLat(event.lngLat).addTo(map);

        this.lng = event.lngLat.lng;
        this.lat = event.lngLat.lat;
      });
    } else {
      console.log('Ubicación seleccionada', this.lat, this.lng);
      const map = this.mapboxService.mapaLngLat(this.lat, this.lng);
      const marker = new mapboxgl.Marker({
        color: '#314ccd',
      });
      // Agregar un evento de escucha para capturar la ubicación seleccionada
      map.on('click', (event) => {
        // Use the returned LngLat object to set the marker location
        // https://docs.mapbox.com/mapbox-gl-js/api/#lnglat
        marker.setLngLat(event.lngLat).addTo(map);

        this.lng = event.lngLat.lng;
        this.lat = event.lngLat.lat;
        console.log(this.lng, this.lat);
      });
    }
  }
}

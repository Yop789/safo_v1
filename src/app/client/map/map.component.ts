import { MapboxService } from './../../services/mapbox/mapbox.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    private mapboxService: MapboxService
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss({ lat: this.lat, lng: this.lng }, 'confirm');
  }

  ngOnInit() {
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
      console.log(this.lng, this.lat);
    });
  }
}

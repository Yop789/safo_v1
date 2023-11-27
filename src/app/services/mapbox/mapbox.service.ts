import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  private lat = 21.163261;
  private lng = -100.928345;
  private zoom = 17;
  private map: mapboxgl.Map;
  private geocoder: MapboxGeocoder;

  constructor() {
    // Configura el token de acceso de Mapbox en el objeto mapboxgl
  }

  initializeMap(): mapboxgl.Map {
    this.map = new mapboxgl.Map({
      accessToken: '' + environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/safo2023/clpg36elz008d01qme4896cuu',
      center: [this.lng, this.lat],
      zoom: this.zoom,
    });

    this.geocoder = new MapboxGeocoder({
      accessToken: environment.mapbox.accessToken,
      mapboxgl: mapboxgl,
    });

    this.map.addControl(this.geocoder);
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    return this.map;
  }

  // Método para llamar al evento desde fuera de la clase
}

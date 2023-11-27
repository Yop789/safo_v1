import { TypeStoreService } from './../../services/type/store.service';
import { Store } from './../../models/store';
import { Type } from './../../models/type';
import { Router } from '@angular/router';
import { AlertService } from './../../services/alert/alert.service';
import { StoreService } from './../../services/api/store.service';
import { User } from './../../models/user';
import { TokenService } from './../../services/token/token.service';
import { MapboxService } from './../../services/mapbox/mapbox.service';

import { TituloAppService } from 'src/app/services/titulo-app.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.scss'],
})
export class RegisterStoreComponent implements OnInit {
  form: FormGroup;
  file: any = null;
  lat: any = 0;
  lng: any = 0;
  user: User;
  qualifications: any = [];
  typeStore: Type[] = [];
  constructor(
    private fb: FormBuilder,
    private tituloAppService: TituloAppService,
    private mapboxService: MapboxService,
    private tokenService: TokenService,
    private storeService: StoreService,
    private alertService: AlertService,
    private router: Router,
    private typeStoreService: TypeStoreService
  ) {
    this.form = this.fb.group({
      nombreTienda: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipoTienda: ['', Validators.required],
    });
    this.user = this.tokenService.decodeToken();
    this.typeStore = this.typeStoreService.getTypes();
  }

  ngOnInit() {
    this.tituloAppService.titulo = 'Registro de Tiendas';
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
  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('idUser', this.user._id);
      formData.append('name', this.form.value.nombreTienda);
      formData.append('description', this.form.value.descripcion);
      formData.append('category', this.form.value.tipoTienda);
      formData.append('lat', this.lat);
      formData.append('log', this.lng);

      if (this.file) {
        formData.append('img', this.file);
      }
      this.storeService.createStore(formData).subscribe((data: any) => {
        this.alertService.presentAlert(data.msg);
        this.router.navigate(['/home/client/tienda']);
      });
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
    } else this.file = null;
  }
}

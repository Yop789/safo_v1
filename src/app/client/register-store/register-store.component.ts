import { TypeStoreService } from './../../services/type/store.service';
import { Type } from './../../models/type';
import { Router } from '@angular/router';
import { AlertService } from './../../services/alert/alert.service';
import { StoreService } from './../../services/api/store.service';
import { User } from './../../models/user';
import { TokenService } from './../../services/token/token.service';

import { TituloAppService } from 'src/app/services/titulo-app.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MapComponent } from '../map/map.component';

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
  imageUrl: string = '';
  user: User;
  qualifications: any = [];
  typeStore: Type[] = [];
  constructor(
    private fb: FormBuilder,
    private tituloAppService: TituloAppService,
    private tokenService: TokenService,
    private storeService: StoreService,
    private alertService: AlertService,
    private router: Router,
    private typeStoreService: TypeStoreService,
    private modalCtrl: ModalController
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
        this.router.navigateByUrl('/home/client/tienda');
      });
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
    } else this.file = null;

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  openFileInput(): void {
    // Simular clic en el input de tipo archivo
    (document.getElementById('fileInput') as HTMLInputElement)?.click();
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: MapComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.lat = data.lat;
      // this.lng = data.lng;
      this.lat = data.lat;
      this.lng = data.lng;
    }
  }
  cancelar() {
    this.router.navigate(['/home/client/tienda']);
  }
}

import { AdvertisementService } from './../../services/advertisement.service';
import { AlertService } from './../../services/alert/alert.service';
import { StoreService } from './../../services/api/store.service';
import { User } from './../../models/user';
import { TokenService } from './../../services/token/token.service';
import { TituloAppService } from './../../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from 'src/app/models/store';

@Component({
  selector: 'app-agregar-publicidad',
  templateUrl: './agregar-publicidad.component.html',
  styleUrls: ['./agregar-publicidad.component.scss'],
})
export class AgregarPublicidadComponent implements OnInit {
  form: FormGroup;
  file: any = null;
  stores: Store[] = [];
  imageUrl: string = '';
  user: User;
  qualifications: any = [];
  guardarbtn = true;

  constructor(
    private fb: FormBuilder,
    private tituloAppService: TituloAppService,
    private tokenService: TokenService,
    private advertisementService: AdvertisementService,
    private storeService: StoreService,
    private alertService: AlertService,
    private router: Router // private modalCtrl: ModalController
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cantidad: ['', Validators.required],
      idStore: ['', Validators.required],
    });
    this.user = this.tokenService.decodeToken();
    this.getTiendas();
  }

  ngOnInit() {
    this.tituloAppService.titulo = 'Registro de publicidad';
  }
  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();

      formData.append('idStore', this.form.value.idStore);
      formData.append('name', this.form.value.name);
      formData.append('description', this.form.value.description);
      formData.append('cantidad', this.form.value.cantidad);
      formData.append('expiration', this.form.value.cantidad);

      // Comenta o ajusta según sea necesario
      // formData.append('lat', this.lat);
      // formData.append('log', this.lng);

      if (this.file) {
        formData.append('img', this.file);
      }

      this.advertisementService
        .createPublicidad(formData)
        .subscribe((data: any) => {
          this.guardarbtn = false;
          this.alertService.presentAlert(data.message);
          this.router.navigate(['/home/client/publicidad']);
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
  getTiendas() {
    this.storeService.getStoreByIdUser().subscribe((data: Store[]) => {
      this.stores = data;
    });
  }
}

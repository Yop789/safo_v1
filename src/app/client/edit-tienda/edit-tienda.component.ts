import { User } from './../../models/user';
import { Type } from './../../models/type';
import { ModalController } from '@ionic/angular';
import { TypeStoreService } from './../../services/type/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from './../../services/alert/alert.service';
import { StoreService } from './../../services/api/store.service';
import { TokenService } from './../../services/token/token.service';
import { TituloAppService } from './../../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-edit-tienda',
  templateUrl: './edit-tienda.component.html',
  styleUrls: ['./edit-tienda.component.scss'],
})
export class EditTiendaComponent implements OnInit {
  form: FormGroup;
  file: any = null;
  lat: any = 0;
  lng: any = 0;
  imageUrl: string = '';
  user: User;
  qualifications: any = [];
  typeStore: Type[] = [];
  idStore: string;
  constructor(
    private fb: FormBuilder,
    private tituloAppService: TituloAppService,
    private tokenService: TokenService,
    private storeService: StoreService,
    private alertService: AlertService,
    private router: Router,
    private typeStoreService: TypeStoreService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private camera: Camera
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });
    this.user = this.tokenService.decodeToken();
    this.typeStore = this.typeStoreService.getTypes();
    this.getStoreBy();
  }

  ngOnInit() {
    this.tituloAppService.titulo = 'Editar Tiendas';
  }
  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('idUser', this.user._id);
      formData.append('name', this.form.value.name);
      formData.append('description', this.form.value.description);
      formData.append('category', this.form.value.category);
      formData.append('lat', this.lat);
      formData.append('log', this.lng);

      if (this.file) {
        formData.append('img', this.file);
      }
      this.storeService
        .updateStore(this.idStore, formData)
        .subscribe((data: any) => {
          this.alertService.presentAlert(data.message);
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
      componentProps: {
        lat: this.lat,
        lng: this.lng,
      },
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
  getStoreBy() {
    this.idStore = this.route.snapshot.params['id'];
    this.storeService.getStoreByID(this.idStore).subscribe((data: any) => {
      this.form.patchValue(data);
      this.imageUrl = data.image;
      this.lat = data.lat;
      this.lng = data.log;
    });
  }
  cancelar() {
    this.router.navigate(['/home/client/tienda']);
  }
}

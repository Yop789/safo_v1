import { UserApiService } from './../../services/api/user.api.service';
import { AlertService } from './../../services/alert/alert.service';
import { TokenService } from './../../services/token/token.service';
import { RecetaService } from './../../services/receta.service';
import { TituloAppService } from './../../services/titulo-app.service';
import { User } from './../../models/user';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  form: FormGroup;
  imageUrl: string = '';

  file: any = null;
  user: User;
  constructor(
    private tituloAppService: TituloAppService,
    private fb: FormBuilder,
    private userApiService: UserApiService,

    private tokenService: TokenService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        { valu: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      telefono: ['', [Validators.required, this.validarTelefono]],
    });
    this.user = this.tokenService.decodeToken();
    this.imageUrl = this.user.avatar;
  }

  ngOnInit() {}
  ionViewDidEnter() {
    this.tituloAppService.titulo = 'User';
    this.form.patchValue(this.user);
  }

  summit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('name', this.form.value.name);
      formData.append('telefono', this.form.value.telefono);
      if (this.file) {
        formData.append('avatar', this.file);
      }
      this.userApiService
        .updateUser(this.user._id, formData)
        .subscribe((result: any) => {
          this.form.patchValue(result.user);
          this.imageUrl = result.user.avatar;
          this.alertService.presentAlert(result.message);
          this.userApiService
            .Token(this.user.idUserFire)
            .subscribe((result: any) =>
              localStorage.setItem('token', result.token)
            );
        });
    }
  }
  cancelar() {
    this.router.navigateByUrl(`home`);
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

  async openModalIngredientes() {
    // const modal = await this.modalCtrl.create({
    //   component: IngredientesComponent,
    //   componentProps: {
    //     ingredientesIniciales: this.ingredientes, // Pasa tu lista de ingredientes aquí
    //   },
    // });
    // modal.present();
    // const { data, role } = await modal.onWillDismiss();
    // if (role === 'confirm') {
    //   this.ingredientes = data;
    // }
  }
  async openModalInstrucciones() {
    // const modal = await this.modalCtrl.create({
    //   component: InstruccionesComponent,
    //   componentProps: {
    //     instruccionesIniciales: this.step, // Pasa tu lista de ingredientes aquí
    //   },
    // });
    // modal.present();
    // const { data, role } = await modal.onWillDismiss();
    // if (role === 'confirm') {
    //   this.step = data;
    // }
  }
  validarTelefono(control) {
    const telefono = control.value;

    // Expresión regular para validar que haya exactamente 10 dígitos numéricos
    const patron = /^\d{10}$/;

    if (telefono && !patron.test(telefono)) {
      return { telefonoInvalido: true };
    }

    return null;
  }
}

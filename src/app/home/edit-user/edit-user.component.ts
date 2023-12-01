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
  formReceta: FormGroup;
  imageUrl: string = '';

  file: any = null;
  user: User;
  constructor(
    private tituloAppService: TituloAppService,
    private fb: FormBuilder,
    private recetaService: RecetaService,

    private tokenService: TokenService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.formReceta = this.fb.group({
      name: ['', [Validators.required]],
    });
    this.user = this.tokenService.decodeToken();
    this.tituloAppService.titulo = 'User';
  }

  ngOnInit() {}

  summit() {
    if (this.formReceta.valid) {
      const formData = new FormData();

      formData.append('name', this.formReceta.value.name);

      if (this.file) {
        formData.append('img', this.file);
      }
      this.recetaService.createRecipe(formData).subscribe((result: any) => {
        this.alertService.presentAlert(result.message);
        this.router.navigateByUrl(`home/publicaciones`);
      });
    }
  }
  cancelar() {
    // Lógica para cancelar
    this.formReceta.reset();

    this.imageUrl = null;
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
}

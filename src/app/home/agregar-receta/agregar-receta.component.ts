import { AlertService } from './../../services/alert/alert.service';
import { User } from './../../models/user';
import { TokenService } from './../../services/token/token.service';
import { Ingredient } from './../../models/ingredient';
import { Step } from './../../models/step';
import { Component, OnInit } from '@angular/core';
import { TituloAppService } from '../../services/titulo-app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecetaService } from '../../services/receta.service';

import { Recipe } from '../../models/recipe'; // Importa los modelos
import { IngredientesComponent } from '../ingredientes/ingredientes.component';
import { ModalController } from '@ionic/angular';
import { InstruccionesComponent } from '../instrucciones/instrucciones.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.component.html',
  styleUrls: ['./agregar-receta.component.scss'],
})
export class AgregarRecetaComponent implements OnInit {
  formReceta: FormGroup;
  imageUrl: string = '';
  ingredientes: Ingredient[] = [];
  step: Step[] = [];
  file: any = null;
  user: User;
  constructor(
    private tituloAppService: TituloAppService,
    private fb: FormBuilder,
    private recetaService: RecetaService,
    private modalCtrl: ModalController,
    private tokenService: TokenService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.formReceta = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]], // Puedes asignar un valor por defecto
      duration: ['', [Validators.required]],
      type: ['', [Validators.required]], // Puedes asignar un valor por defecto
      difficulty: ['', [Validators.required]], // Puedes asignar un valor por defecto
      category: ['', [Validators.required]], // Puedes asignar un valor por defecto
    });
    this.user = this.tokenService.decodeToken();
    this.tituloAppService.titulo = 'Agregar Receta';
  }

  ngOnInit() {}

  summit() {
    if (this.formReceta.valid) {
      const formData = new FormData();
      formData.append('idUser', this.user._id);
      formData.append('name', this.formReceta.value.name);
      formData.append('description', this.formReceta.value.description);
      formData.append('duration', this.formReceta.value.duration);
      formData.append('type', this.formReceta.value.type);
      formData.append('difficulty', this.formReceta.value.difficulty);
      formData.append('category', this.formReceta.value.category);
      formData.append('ingredients', JSON.stringify(this.ingredientes));
      formData.append('steps', JSON.stringify(this.step));

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
    this.ingredientes = [];
    this.step = [];
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
    const modal = await this.modalCtrl.create({
      component: IngredientesComponent,
      componentProps: {
        ingredientesIniciales: this.ingredientes, // Pasa tu lista de ingredientes aquí
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.ingredientes = data;
    }
  }
  async openModalInstrucciones() {
    const modal = await this.modalCtrl.create({
      component: InstruccionesComponent,
      componentProps: {
        instruccionesIniciales: this.step, // Pasa tu lista de ingredientes aquí
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.step = data;
    }
  }
}

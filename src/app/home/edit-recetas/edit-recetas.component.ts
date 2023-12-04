import { User } from './../../models/user';
import { Step } from './../../models/step';
import { Ingredient } from './../../models/ingredient';
import { Recipe } from './../../models/recipe';
import { RecetaService } from './../../services/receta.service';
import { AlertService } from './../../services/alert/alert.service';
import { TokenService } from './../../services/token/token.service';
import { TituloAppService } from './../../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';
import { IngredientesComponent } from '../ingredientes/ingredientes.component';
import { InstruccionesComponent } from '../instrucciones/instrucciones.component';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-recetas',
  templateUrl: './edit-recetas.component.html',
  styleUrls: ['./edit-recetas.component.scss'],
})
export class EditRecetasComponent implements OnInit {
  formReceta: FormGroup;
  imageUrl: string = '';
  ingredientes: Ingredient[] = [];
  step: Step[] = [];
  file: any = null;
  user: User;
  id: string;
  constructor(
    private tituloAppService: TituloAppService,
    private fb: FormBuilder,
    private recetaService: RecetaService,
    private modalCtrl: ModalController,
    private tokenService: TokenService,
    private alertService: AlertService,
    private route: ActivatedRoute,
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
  }

  ngOnInit() {
    this.tituloAppService.titulo = 'Editar Receta';
    this.getRecet();
  }

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
      this.recetaService
        .updateRecipe(formData, this.id)
        .subscribe((result: any) => {
          console.log('Receta creada exitosamente:', result);
          this.alertService.presentAlert(result.message);
          this.router.navigateByUrl(`home/publicaciones`);
        });
    }
  }
  cancelar() {
    this.publicaciones();
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
  getRecet() {
    this.id = this.route.snapshot.params['id'];
    if (this.id != null) {
      this.recetaService.getRecipeById(this.id).subscribe((resp: Recipe) => {
        this.formReceta.patchValue(resp);
        this.ingredientes = resp.ingredients;
        this.step = resp.steps;
        this.imageUrl = resp.image;
      });
    } else {
      this.publicaciones();
    }
  }
  publicaciones() {
    this.router.navigate(['/home/publicaciones']);
  }
}

import { Component, OnInit } from '@angular/core';
import { TituloAppService } from '../../services/titulo-app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecetaService } from '../../services/receta.service';
import { Ingredient } from 'src/app/models/ingredient';
import { Step } from 'src/app/models/step';
import { Qualification } from 'src/app/models/qualification';
import { Recipe } from '../../models/recipe'; // Importa los modelos

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.component.html',
  styleUrls: ['./agregar-receta.component.scss'],
})
export class AgregarRecetaComponent implements OnInit {
  formReceta: FormGroup;

  constructor(
    private tituloAppService: TituloAppService,
    private fb: FormBuilder,
    private recetaService: RecetaService
  ) {
    this.formReceta = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]], // Puedes asignar un valor por defecto
      qualification: [[]],
      duration: ['', [Validators.required]],
      type: ['', [Validators.required]], // Puedes asignar un valor por defecto
      difficulty: ['', [Validators.required]], // Puedes asignar un valor por defecto
      category: ['', [Validators.required]], // Puedes asignar un valor por defecto
      image: [' ', [Validators.required]], // Asigna la ruta de la imagen (puedes procesarla antes)
      ingredients: this.fb.array([]), // Aquí puedes construir un form array para los ingredientes
      steps: this.fb.array([]), // Aquí puedes construir un form array para los pasos
    });
  }

  ngOnInit() {
    this.tituloAppService.titulo = 'Agregar Receta';
  }

  agregarReceta() {
    if (this.formReceta.valid) {
      const nuevaReceta: Recipe = this.formReceta.value;

      this.recetaService.createRecipe(nuevaReceta).subscribe(
        (response) => {
          console.log('Receta creada exitosamente:', response);
          // Puedes agregar lógica adicional después de crear la receta
        },
        (error) => {
          console.error('Error al crear la receta:', error);
          // Puedes manejar el error aquí
        }
      );
    } else {
      console.log('Formulario no válido. Asegúrate de completar todos los campos.');
    }
  }

  cancelar() {
    // Lógica para cancelar
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];
      // Puedes hacer algo con el archivo si es necesario
    }
  }
}

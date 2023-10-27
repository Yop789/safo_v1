import { Component, OnInit } from '@angular/core';
import { TituloAppService } from '../../services/titulo-app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.component.html',
  styleUrls: ['./agregar-receta.component.scss'],
})
export class AgregarRecetaComponent  implements OnInit {

  formReceta: FormGroup;

  constructor( 
    private tituloAppService: TituloAppService,
    private fb: FormBuilder) {
    this.formReceta = this.fb.group({
      nombre: ['', [Validators.required]],
      tiempo: ['', [Validators.required]],
      ingredientes: ['', [Validators.required]],
      pasos: ['', [Validators.required]],
      imagen:[null]
    });
  }
  ngOnInit() {
    this.tituloAppService.titulo = 'Agregar Receta';
  }

  agregarReceta(){
    
  }

  cancelar(){

  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0]; 
      //this.formReceta.get('imagen').setValue(file);
    }
  }

}

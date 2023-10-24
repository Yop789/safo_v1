import { Component, OnInit } from '@angular/core';
import { TituloAppService } from '../../services/titulo-app.service';

@Component({
  selector: 'app-mis-platillos',
  templateUrl: './mis-platillos.component.html',
  styleUrls: ['./mis-platillos.component.scss'],
})
export class MisPlatillosComponent  implements OnInit {
  recetas: any[] | undefined;
  constructor(private tituloAppService:TituloAppService)
  {
    this.recetas = [
      {
        nombre: 'Receta 1',
        descripcion: 'Descripción de la Receta 1',
        imagen: 'URL de la imagen 1',
        calificacion: 5 // Asegúrate de que 'calificacion' sea un número en el rango de 0 a 5
      }]
  }
  generarEstrellas(calificacion: number): number[] {
    return Array(calificacion).fill(0);
  }
  ngOnInit() {
    this.tituloAppService.titulo="Mis platillos"
  }

}

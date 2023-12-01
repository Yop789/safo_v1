import { Recipe } from './../../models/recipe';
import { RecetaService } from './../../services/receta.service';
import { TituloAppService } from 'src/app/services/titulo-app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regla',
  templateUrl: './regla.component.html',
  styleUrls: ['./regla.component.scss'],
})
export class ReglaComponent implements OnInit {
  item: Recipe;
  constructor(
    private tituloAppService: TituloAppService,
    private recetaService: RecetaService
  ) {}

  ionViewDidEnter() {
    this.tituloAppService.titulo = 'Receta Aleatoria';
    this.getResetRandome();
  }

  ngOnInit() {}
  getResetRandome() {
    this.recetaService.getResetRandom().subscribe((res: any) => {
      this.item = res.recipe;
    });
  }
  estrella(data: any) {
    if (data.length > 0) {
      let sumaCalificaciones = data.reduce(
        (acumulador, objeto) => acumulador + objeto.qualification,
        0
      );
      return sumaCalificaciones / data.length;
    } else {
      return 0;
    }
  }
  onClick() {
    this.getResetRandome();
  }
}

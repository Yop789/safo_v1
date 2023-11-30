import { AlertService } from './../../services/alert/alert.service';
import { TituloAppService } from './../../services/titulo-app.service';
import { RecetaService } from './../../services/receta.service';
import { Recipe } from './../../models/recipe';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
})
export class PublicacionesComponent implements OnInit {
  isActionSheetOpen = false;
  public actionSheetButtons = [
    {
      text: 'Eliminar',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Ver',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Editar',
      data: {
        action: 'edit',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
  public items: Recipe[] = [];
  id: string;

  constructor(
    private recetaService: RecetaService,
    private tituloAppService: TituloAppService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.tituloAppService.titulo = 'Publicaciones de recetas';
  }

  ngOnInit() {
    this.get();
  }
  open(id) {
    this.isActionSheetOpen = true;
    this.id = id;
    // console.log(id);
  }
  action(ev) {
    this.isActionSheetOpen = false;

    switch (ev.detail.data.action) {
      case 'edit':
        this.edit();
        break;
      case 'cancel':
        break;
      case 'delete':
        this.delete();
        break;
      case 'share':
        this.view();
        break;
      default:
        break;
    }
  }
  publicar() {
    this.router.navigate(['/home/agregar-receta']);
  }
  get() {
    this.recetaService.getRecipe().subscribe((data: Recipe[]) => {
      this.items = data;
    });
  }
  delete() {
    this.recetaService.deleteRecipeById(this.id).subscribe((data: any) => {
      this.get();
      this.alertService.presentAlert(data.message);
    });
  }
  edit() {
    this.router.navigate([`/home/edit-receta/${this.id}`]);
  }
  view() {
    this.router.navigate([`/home/view/${this.id}`]);
  }
}

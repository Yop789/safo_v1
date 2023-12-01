import { ModalController, NavController } from '@ionic/angular';
import { TituloAppService } from './../../services/titulo-app.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from './../../models/recipe';
import { RecetaService } from './../../services/receta.service';
import { Component, OnInit } from '@angular/core';
import { CalificacioComentarComponent } from '../calificacio-comentar/calificacio-comentar.component';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent implements OnInit {
  starRating = 0;
  data: Recipe;
  id: string;
  constructor(
    private recetaService: RecetaService,
    private route: ActivatedRoute,
    private tituloAppService: TituloAppService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}
  ionViewDidEnter() {
    this.getRecet();
    this.tituloAppService.titulo = 'Detalles de la Receta';
  }
  ngOnInit() {}
  getRecet() {
    this.id = this.route.snapshot.params['id'];
    if (this.id != null) {
      this.recetaService.getRecipeById(this.id).subscribe(
        (resp: Recipe) => {
          this.data = resp;
          this.estrellas();
        },
        (error) => {
          this.goBack();
        }
      );
    } else {
      this.getRecet();
    }
  }
  goBack() {
    this.navCtrl.back({ animationDirection: 'back' });

    this.tituloAppService.back();
  }
  async openModalInstrucciones() {
    const modal = await this.modalCtrl.create({
      component: CalificacioComentarComponent,
      componentProps: {
        Calif: { idReceta: this.id }, // Pasa tu lista de ingredientes aquí
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.getRecet();
    } else {
      this.getRecet();
    }
  }

  estrellas() {
    let sumaCalificaciones = this.data.qualification.reduce(
      (acumulador, objeto) => acumulador + objeto.qualification,
      0
    );
    this.starRating = sumaCalificaciones / this.data.qualification.length;
  }
}

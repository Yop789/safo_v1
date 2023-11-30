import { AlertService } from './../../services/alert/alert.service';
import { Qualification } from './../../models/qualification';
import { User } from './../../models/user';

import { TokenService } from './../../services/token/token.service';
import { RecetaService } from './../../services/receta.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Step } from 'src/app/models/step';

@Component({
  selector: 'app-calificacio-comentar',
  templateUrl: './calificacio-comentar.component.html',
  styleUrls: ['./calificacio-comentar.component.scss'],
})
export class CalificacioComentarComponent implements OnInit {
  form: FormGroup;
  list;
  index: number = 0;
  edit: boolean = false;
  starRating = 0;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    public navParams: NavParams,
    private recetaService: RecetaService,
    private tokenService: TokenService,
    private alertService: AlertService
  ) {
    this.form = this.fb.group({
      comment: ['', [Validators.required]],
    });
    this.list = this.navParams.get('Calif');
    console.log(this.list);
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const user: User = this.tokenService.decodeToken();

    const data: Qualification = {
      idUser: user._id,
      qualification: this.starRating,
      comment: this.form.value.comment,
    };
    this.recetaService
      .createQualification(this.list.idReceta, data)
      .subscribe((res) => {
        this.alertService.presentAlert(res.message);
        // return this.modalCtrl.dismiss(this.list, 'confirm');
      });
    return null;
  }
}

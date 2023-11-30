import { DataC } from './../../models/data-c';
import { AlertService } from './../../services/alert/alert.service';
import { Qualification } from './../../models/qualification';
import { User } from './../../models/user';

import { TokenService } from './../../services/token/token.service';
import { RecetaService } from './../../services/receta.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-calificacio-comentar',
  templateUrl: './calificacio-comentar.component.html',
  styleUrls: ['./calificacio-comentar.component.scss'],
})
export class CalificacioComentarComponent implements OnInit {
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
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
  form: FormGroup;
  list;
  index: number = 0;
  edit: boolean = false;
  starRating = 0;
  user: User;
  data: DataC[] = [];
  idComent: string;
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

    this.getCalif();
    this.getUser();
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const data: Qualification = {
      idUser: this.user._id,
      qualification: this.starRating,
      comment: this.form.value.comment,
    };
    this.recetaService
      .createQualification(this.list.idReceta, data)
      .subscribe((res) => {
        this.alertService.presentAlert(res.message);
        this.getCalif();
        this.limpiar();
      });
    return null;
  }
  getCalif() {
    this.recetaService
      .getQualification(this.list.idReceta)
      .subscribe((res: any) => {
        this.data = res.qualification;
      });
  }
  limpiar() {
    this.form.reset();
    this.starRating = 0;
  }
  getUser() {
    this.user = this.tokenService.decodeToken();
  }
  action(ev) {
    this.isActionSheetOpen = false;

    switch (ev.detail.data.action) {
      case 'cancel':
        break;
      case 'delete':
        this.deleteComent();
        break;

      default:
        break;
    }
  }
  open(id) {
    this.isActionSheetOpen = true;
    this.idComent = id;
    // console.log(id);
  }
  deleteComent() {
    this.recetaService
      .deleteQualification(this.list.idReceta, this.idComent)
      .subscribe((res) => {
        this.alertService.presentAlert(res.message);
        this.getCalif();
        this.limpiar();
      });
  }
}

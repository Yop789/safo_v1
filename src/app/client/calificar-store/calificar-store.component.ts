import { StoreService } from './../../services/api/store.service';
import { User } from './../../models/user';
import { DataC } from './../../models/data-c';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Qualification } from './../../models/qualification';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { TokenService } from 'src/app/services/token/token.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-calificar-store',
  templateUrl: './calificar-store.component.html',
  styleUrls: ['./calificar-store.component.scss'],
})
export class CalificarStoreComponent implements OnInit {
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
  idUserStore: string;
  data: DataC[] = [];
  idComent: string;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    public navParams: NavParams,
    private storeService: StoreService,
    private tokenService: TokenService,
    private alertService: AlertService
  ) {
    this.form = this.fb.group({
      comment: ['', [Validators.required]],
    });
    this.list = this.navParams.get('Calif');

    this.getUser();
    this.getCalif();
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
    this.storeService
      .createQualification(this.list.idStore, data)
      .subscribe((res) => {
        this.alertService.presentAlert(res.message);
        this.getCalif();
        this.limpiar();
      });
    return null;
  }
  getCalif() {
    this.storeService
      .getQualification(this.list.idStore)
      .subscribe((res: any) => {
        this.idUserStore = res.idUser;

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
    this.storeService
      .deleteQualification(this.list.idStore, this.idComent)
      .subscribe((res) => {
        this.alertService.presentAlert(res.message);
        this.getCalif();
        this.limpiar();
      });
  }
}

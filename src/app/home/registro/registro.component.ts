import { ErroresFirebaseService } from './../../services/ErroresFirebase/errores-firebase.service';
import { AlertService } from './../../services/alert/alert.service';
import { UserApiService } from './../../services/api/user.api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../models/user';
import { TituloAppService } from './../../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  //Variables
  public formReg: FormGroup;
  private emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  private passForm =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  public password = false;
  public terminos = false;
  public isNavegador: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private tituloAppService: TituloAppService,
    private router: Router,
    private route: ActivatedRoute,
    private userApiService: UserApiService,
    private alertService: AlertService,
    private erroresFirebaseService: ErroresFirebaseService,
    private platform: Platform
  ) {
    this.isNavegador = this.platform.is('desktop');
    this.formReg = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(this.emailPattern),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(this.passForm),
        ]),
        passwordValid: new FormControl('', [Validators.required]),
      },
      { validator: this.checkPasswords }
    );
    this.tituloAppService.titulo = 'Registro';
  }
  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('passwordValid')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnInit() {}
  summit() {
    this.usuarioService
      .register(this.formReg.value)
      .then((resp) => {
        let rol = '';
        this.route.params.subscribe((params) => {
          rol = params['id'];
          // Ahora, 'this.id' contendrá el valor del parámetro 'id'
        });
        const user: User = {
          idUserFire: resp.user.uid,
          name: this.formReg.value.name,
          email: this.formReg.value.email,
          rol: rol,
        };
        this.insertUser(user);
      })
      .catch((error) => {
        const e: any = this.erroresFirebaseService.handleFirebaseError(error);
        this.alertService.presentAlert(e.__zone_symbol__value);
      });
  }
  onClic() {
    this.usuarioService
      .loginWi()
      .then((resp) => {
        let rol = '';
        this.route.params.subscribe((params) => {
          rol = params['id'];
          // Ahora, 'this.id' contendrá el valor del parámetro 'id'
        });
        const user: User = {
          idUserFire: resp.user.uid,
          name: `${resp.user.displayName}`,
          email: `${resp.user.email}`,
          rol: rol,
        }; // Puedes mostrar información útil en la consola.
        this.insertUser(user);
      })
      .catch((error) => {
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario.
        this.alertService.presentAlert(
          error || 'Error en el servidor lo sentimos inténtelo nuevamente'
        ); // Puedes mostrar información detallada del error en la consola.
      });
  }
  insertUser(user: User): void {
    this.userApiService.createUser(user).subscribe(
      (data: any) => {
        console.log(data);
        this.alertService.presentAlert(data.msg);
        this.router.navigate(['home/iniciosesio']);
      },
      (error: HttpErrorResponse) => {
        this.alertService.presentAlert(error.error.msg); // Acceder al mensaje de error general error.error.error); // Acceder al mensaje de error específico
        // Aquí puedes mostrar el mensaje de error o manejarlo de la manera que desees
      }
    );
  }
}

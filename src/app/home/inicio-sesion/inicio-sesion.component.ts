import { MenuService } from './../../services/menu/menu.service';
import { TokenService } from './../../services/token/token.service';
import { ErroresFirebaseService } from './../../services/ErroresFirebase/errores-firebase.service';
import { UserApiService } from './../../services/api/user.api.service';
import { AlertService } from './../../services/alert/alert.service';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { TituloAppService } from 'src/app/services/titulo-app.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
})
export class InicioSesionComponent implements OnInit {
  public formInicioSesion: FormGroup;
  public mostrarPassword: boolean = false;
  isNavegador: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private tituloAppService: TituloAppService,
    private router: Router,
    private alertService: AlertService,
    private userApiService: UserApiService,
    private erroresFirebaseService: ErroresFirebaseService,
    private MenuService: MenuService,
    private platform: Platform
  ) {
    this.isNavegador = this.platform.is('desktop');
    this.formInicioSesion = this.formBuilder.group({
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i),
        ],
      ],
      password: [
        '',
        [
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          ),
        ],
      ],
    });
  }

  ngOnInit() {
    this.tituloAppService.titulo = 'Iniciar Sesión';
  }

  togglePasswordVisibility() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  iniciarSesion() {
    if (this.formInicioSesion.valid) {
      const email = this.formInicioSesion.get('correo')?.value;
      const password = this.formInicioSesion.get('password')?.value;

      this.usuarioService
        .login(email, password)
        .then((resp: any) => {
          console.log(resp.user._delegate.uid);
          this.userApiService
            .Token(resp.user._delegate.uid)
            .subscribe((user: any) => {
              if (user) {
                localStorage.setItem('token', user.token);
                this.MenuService.setUser(user.token);
                this.router.navigate(['/home/inicio']);
              }
            });
        })
        .catch((error) => {
          const s: any = this.erroresFirebaseService.handleFirebaseError(error);
          this.alertService.presentAlert(s.__zone_symbol__value);
        });

      // Maneja la respuesta de inicio de sesión exitoso.

      // Redirige al usuario a la página de inicio después del inicio de sesión exitoso
    } else {
      // El formulario no es válido, puedes mostrar un mensaje de error o hacer algo más.
    }
  }

  onClic() {
    this.usuarioService
      .loginByGoogle()
      .then((resp: any) => {
        this.userApiService.Token(resp.user._delegate.uid).subscribe(
          (user: any) => {
            if (user) {
              localStorage.setItem('token', user.token);
              this.MenuService.setUser(user.token);
              this.router.navigate(['/home/inicio']);
            }
          },
          (error) => {
            this.alertService.presentAlert(error.error.error);
          }
        );
      })
      .catch((error) => {
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario.
        this.alertService.presentAlert(error); // Puedes mostrar información detallada del error en la consola.
      });
  }

  decodeToken() {}
}

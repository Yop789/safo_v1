import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { TituloAppService } from 'src/app/services/titulo-app.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
})
export class InicioSesionComponent implements OnInit {
  public formInicioSesion: FormGroup;
  public mostrarPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private tituloAppService: TituloAppService
  ) {
    this.formInicioSesion = this.formBuilder.group({
      usuario: [
        '',
        [Validators.required, Validators.pattern(/^[a-z0-9._]+$/i)],
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
      const usuario = this.formInicioSesion.get('usuario')?.value;
      const password = this.formInicioSesion.get('password')?.value;

      // Llama al servicio de autenticación para verificar las credenciales.
      this.authService.iniciarSesion(usuario, password).subscribe(
        (response) => {
          // Maneja la respuesta de inicio de sesión exitoso.
          console.log('Inicio de sesión exitoso');
        },
        (error) => {
          // Maneja el error de inicio de sesión.
          console.error('Error al iniciar sesión:', error);
        }
      );
    } else {
      // El formulario no es válido, puedes mostrar un mensaje de error o hacer algo más.
    }
  }
}

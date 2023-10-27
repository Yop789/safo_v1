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
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
})
export class InicioSesionComponent implements OnInit {
  public formInicioSesion: FormGroup;
  public mostrarPassword: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private tituloAppService: TituloAppService,
    private router: Router
  ) {
    this.formInicioSesion = this.formBuilder.group({
      correo: [
        '',
        [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i)],
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

  async iniciarSesion() {
    if (this.formInicioSesion.valid) {
      const email = this.formInicioSesion.get('correo')?.value;
      const password = this.formInicioSesion.get('password')?.value;

      try {
        const user = await this.usuarioService.login(email, password);
        // Maneja la respuesta de inicio de sesión exitoso.
        console.log('Inicio de sesión exitoso', user);

        // Redirige al usuario a la página de inicio después del inicio de sesión exitoso
        this.router.navigate(['/home/inicio']); // Cambia 'inicio' por la ruta de tu página de inicio

      } catch (error) {
        // Maneja el error de inicio de sesión.
        console.error('Error al iniciar sesión:', error);
      }
    } else {
      // El formulario no es válido, puedes mostrar un mensaje de error o hacer algo más.
    }
  }
}

import { UsuarioService } from './../../services/usuario.service';
import { TituloAppService } from './../../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss'],
})
export class RecuperarComponent implements OnInit {
  formRecuperar: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tituloAppService: TituloAppService,
    private usuarioService: UsuarioService
  ) {
    this.formRecuperar = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  recuperar() {
    const email = this.formRecuperar.get('email')?.value;
    this.usuarioService.resetPassword(email).then((e) => {
      console.log(e);
    });
  }

  ngOnInit() {
    this.tituloAppService.titulo = 'Recuperar contraseña';
  }
}

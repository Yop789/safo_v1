import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  formReg: FormGroup;
  constructor(private usuarioService: UsuarioService) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit() {}
  summit() {
    this.usuarioService
      .register(this.formReg.value)
      .then(console.log)
      .catch((error) => console.log);
  }
  onClic() {
    this.usuarioService
    .loginWi()
    .then((resp) => {
      // Aquí puedes realizar acciones en caso de éxito, como redireccionar al usuario.
      console.log(resp); // Puedes mostrar información útil en la consola.
    })
    .catch((error) => {
      // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario.
      console.error(error); // Puedes mostrar información detallada del error en la consola.
    });
  }


}

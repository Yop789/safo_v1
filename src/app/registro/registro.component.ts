import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  formReg: FormGroup;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  constructor(private usuarioService: UsuarioService,private formBuilder: FormBuilder,) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('validatorPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }
  
  ngOnInit() {}
  summit() {
    this.usuarioService
      .register(this.formReg.value)
      .then(console.log)
      .catch((error) => console.log);

    console.log(this.formReg.value)
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

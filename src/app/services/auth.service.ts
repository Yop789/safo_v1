import { User } from 'firebase/auth';
import { UserApiService } from './api/user.api.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Aquí puedes almacenar información de usuario autenticado si es necesario.
  private usuarioAutenticado: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private userApiService: UserApiService
  ) {}

  authServer() {
    return this.afAuth.authState;
  }
  cerrarSesion(): void {}

  estaAutenticado(): boolean {
    return this.usuarioAutenticado;
  }
}

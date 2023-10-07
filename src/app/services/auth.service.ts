import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Aquí puedes almacenar información de usuario autenticado si es necesario.
  private usuarioAutenticado: boolean = false;

  constructor() {}

  iniciarSesion(usuario: string, password: string): Observable<boolean> {

    if (usuario === 'admin' && password === 'password') {
      this.usuarioAutenticado = true;
      return of(true); // Devolvemos un observable de éxito.
    } else {
      this.usuarioAutenticado = false;
      return of(false); // Devolvemos un observable de falla.
    }
  }

  cerrarSesion(): void {
    // Aquí puedes implementar la lógica para cerrar la sesión del usuario si es necesario.
    this.usuarioAutenticado = false;
  }

  estaAutenticado(): boolean {
    return this.usuarioAutenticado;
  }
}

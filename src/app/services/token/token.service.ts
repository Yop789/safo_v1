import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  decodeToken() {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = new JwtHelperService().decodeToken(token);

      // Verificar si la propiedad 'rol' existe en el token decodificado antes de acceder a ella
      if (decodedToken && decodedToken.rol) {
        return decodedToken;
      }
    }

    // Si no hay token o la propiedad 'rol' no está presente, devolver un usuario por defecto
    const user = {
      rol: {
        name: '',
      },
    };

    return user;
  }
}

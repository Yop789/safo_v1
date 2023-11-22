import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  decodeToken() {
    if (localStorage.length > 0) {
      const token = '' + localStorage.getItem('token');
      if (token) {
        const decodedToken = new JwtHelperService().decodeToken(token);
        // Check if 'rol' property exists in the decoded token before accessing it
        if (decodedToken && decodedToken.rol) {
          return decodedToken;
        }
      }
    } else {
      const user = {
        rol: {
          name: '',
        },
      };
      return user;
    }
  }
}

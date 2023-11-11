import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  secretKey = 'tuClaveSecreta';

  constructor(private authService: AuthService) {}

  decodeToken() {
    return new JwtHelperService().decodeToken(
      '' + localStorage.getItem('token')
    );
  }
}

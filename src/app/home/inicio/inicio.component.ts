import { AuthService } from './../../services/auth.service';
import { TokenService } from './../../services/token/token.service';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {
    this.authService.authServer();
    console.log(this.tokenService.decodeToken());
  }

  ngOnInit() {}
}

import { Router } from '@angular/router';
import { TituloAppService } from './../../services/titulo-app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opcion-user',
  templateUrl: './opcion-user.component.html',
  styleUrls: ['./opcion-user.component.scss'],
})
export class OpcionUserComponent implements OnInit {
  selectedService = '';
  constructor(
    private tituloAppService: TituloAppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tituloAppService.titulo = 'Tipo de servicio';
  }
  pagina(s: string, user: string) {
    this.router.navigateByUrl(`home/${s}/${user}`);
  }
}

import { OpMenusService } from './../../services/OpMenus/op-menus.service';
import { OpMenu } from './../../models/op-menu';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  //Variables
  public menus: OpMenu[] = [];

  constructor(private router: Router, private opMenusService: OpMenusService) {}

  ngOnInit() {
    this.menus = [
      ...this.opMenusService.inicio_sesion,
      ...this.opMenusService.admin,
      ...this.opMenusService.client,
      ...this.opMenusService.defalt,
    ];
  }

  pagina(s: string) {
    this.router.navigateByUrl(`home/${s}`);
  }
}

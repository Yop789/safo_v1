import { MenuService } from './../../services/menu/menu.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router, private menuService: MenuService) {}
  public menu: Menu[] = [];
  ngOnInit() {
    this.menu = this.menuService.getMenus();
  }

  pagina(s: string) {
    this.router.navigateByUrl(`home/${s}`);
  }
}

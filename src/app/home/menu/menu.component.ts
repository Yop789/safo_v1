import { UsuarioService } from './../../services/usuario.service';
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
  constructor(
    private router: Router,
    private menuService: MenuService,
    private usuarioService: UsuarioService
  ) {
    this.menu = this.menuService.getMenus();
  }
  public menu: Menu[] = [];
  ngOnInit() {
    this.menuService.user$.subscribe((menus) => {
      this.menu = this.menuService.getMenus();
    });
  }

  pagina(s: string) {
    if (s != 'salir') {
      this.router.navigateByUrl(`home/${s}`);
    } else {
      this.logaut();
    }
  }
  logaut() {
    localStorage.removeItem('token');
    this.usuarioService.logaut();
    this.router.navigate(['/home/inicio']);
    this.menuService.setUser('Logaut');
  }
}

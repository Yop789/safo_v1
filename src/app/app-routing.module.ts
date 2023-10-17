import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import * as routeHome from './home/home-routing.module';
import { InicioComponent } from './home/inicio/inicio.component';
import { RegistroComponent } from './home/registro/registro.component';
import { InicioSesionComponent } from './home/inicio-sesion/inicio-sesion.component';
import { DetallesComponent } from './home/detalles/detalles.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
      { path: 'inicio', component: InicioComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'iniciosesio', component: InicioSesionComponent },
      { path: 'detalles', component: DetallesComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

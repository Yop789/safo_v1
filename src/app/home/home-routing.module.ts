import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { AgregarRecetaComponent } from './agregar-receta/agregar-receta.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'inicio',
  //   pathMatch: 'full',
  // },
  // { path: 'inicio', component: InicioComponent },
  // { path: 'registro', component: RegistroComponent },
  // { path: 'iniciosesio', component: InicioSesionComponent },
  // { path: 'agregarreceta', component: AgregarRecetaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import * as routeHome from './home/home-routing.module';
import { InicioComponent } from './home/inicio/inicio.component';
import { RegistroComponent } from './home/registro/registro.component';
import { InicioSesionComponent } from './home/inicio-sesion/inicio-sesion.component';
import { DetallesComponent } from './home/detalles/detalles.component';
import { OpcionUserComponent } from './home/opcion-user/opcion-user.component';
import { AdminPage } from './admin/admin.page';
import { AdminPageModule } from './admin/admin.module';
import { ClientPage } from './client/client.page';
import { AuthService } from './services/auth.service';

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
      {
        path: 'inicio',
        component: InicioComponent,
      },
      { path: 'registro/:id', component: RegistroComponent },
      { path: 'iniciosesio', component: InicioSesionComponent },
      { path: 'detalles', component: DetallesComponent },
      { path: 'usuOpc', component: OpcionUserComponent },
      {
        path: 'admin',
        component: AdminPage,
        children: [
          {
            path: '',
            component: AdminPage,
          },
        ],
      },
      {
        path: 'client',
        component: ClientPage,
        children: [
          {
            path: '',
            component: ClientPage,
          },
        ],
      },
    ],
  },
  // {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('./admin/admin.module').then((m) => m.AdminPageModule),
  // },
  // {
  //   path: 'client',
  //   loadChildren: () =>
  //     import('./client/client.module').then((m) => m.ClientPageModule),
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

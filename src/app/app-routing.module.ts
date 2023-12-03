import { MisResetasFavoritasComponent } from './home/mis-resetas-favoritas/mis-resetas-favoritas.component';
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
import { ClientPage } from './client/client.page';
import { ReglaComponent } from './home/regla/regla.component';
import { RecuperarComponent } from './home/recuperar/recuperar.component';
import { StoreComponent } from './client/store/store.component';
import { RegisterStoreComponent } from './client/register-store/register-store.component';
import { PublicacionesComponent } from './home/publicaciones/publicaciones.component';
import { AcercaNosotrosComponent } from './home/acerca-nosotros/acerca-nosotros.component';

import { AgregarRecetaComponent } from './home/agregar-receta/agregar-receta.component';
import { EditRecetasComponent } from './home/edit-recetas/edit-recetas.component';
import { EditTiendaComponent } from './client/edit-tienda/edit-tienda.component';
import { ViewStoreComponent } from './client/view-store/view-store.component';
import { PrincipalComponent } from './client/principal/principal.component';
import { AgregarPublicidadComponent } from './client/agregar-publicidad/agregar-publicidad.component';
import { PublicidadComponent } from './client/publicidad/publicidad.component';
import { EditUserComponent } from './home/edit-user/edit-user.component';
import { TiendasComponent } from './home/tiendas/tiendas.component';
import { MisTiendasFavoritasComponent } from './home/mis-tiendas-favoritas/mis-tiendas-favoritas.component';

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
      { path: 'ruleta', component: ReglaComponent },
      { path: 'recuperar', component: RecuperarComponent },
      { path: 'publicaciones', component: PublicacionesComponent },
      { path: 'agregar-receta', component: AgregarRecetaComponent },
      { path: 'edit-receta/:id', component: EditRecetasComponent },
      { path: 'acerca', component: AcercaNosotrosComponent },
      { path: 'view/:id', component: DetallesComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'tiendas', component: TiendasComponent },
      { path: 'view-tienda/:id', component: ViewStoreComponent },
      { path: 'favorit-store', component: MisTiendasFavoritasComponent },
      { path: 'favorit-receta', component: MisResetasFavoritasComponent },
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
            component: PrincipalComponent,
          },
          { path: 'tienda', component: StoreComponent },
          { path: 'register-tienda', component: RegisterStoreComponent },
          { path: 'edit-tienda/:id', component: EditTiendaComponent },
          { path: 'view-tienda/:id', component: ViewStoreComponent },
          { path: 'agregar-publicidad', component: AgregarPublicidadComponent },
          { path: 'publicidad', component: PublicidadComponent },
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

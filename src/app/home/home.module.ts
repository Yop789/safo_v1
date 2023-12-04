import { MisResetasFavoritasComponent } from './mis-resetas-favoritas/mis-resetas-favoritas.component';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

import { AgregarComponent } from './agregar/agregar.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RegistroComponent } from './registro/registro.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { TituloAppService } from '../services/titulo-app.service';
import { DetallesComponent } from './detalles/detalles.component';
import { AgregarRecetaComponent } from './agregar-receta/agregar-receta.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

import { MisPlatillosComponent } from './mis-platillos/mis-platillos.component';

import { OpcionUserComponent } from './opcion-user/opcion-user.component';
import { ReglaComponent } from './regla/regla.component';
import { AcercaNosotrosComponent } from './acerca-nosotros/acerca-nosotros.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { InstruccionesComponent } from './instrucciones/instrucciones.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { EditRecetasComponent } from './edit-recetas/edit-recetas.component';
import { CalificacioComentarComponent } from './calificacio-comentar/calificacio-comentar.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { TiendasComponent } from './tiendas/tiendas.component';
import { MisTiendasFavoritasComponent } from './mis-tiendas-favoritas/mis-tiendas-favoritas.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot({ mode: 'ios' }),
    HomePageRoutingModule,
    NgbRatingModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
  ],
  declarations: [
    HomePage,
    RegistroComponent,
    InicioComponent,
    AgregarComponent,
    RecuperarComponent,
    InicioSesionComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    DetallesComponent,
    AgregarRecetaComponent,
    OpcionUserComponent,
    ReglaComponent,
    MisPlatillosComponent,
    InstruccionesComponent,
    AcercaNosotrosComponent,

    PreguntasComponent,

    IngredientesComponent,
    AgregarRecetaComponent,
    PublicacionesComponent,
    EditRecetasComponent,
    EditUserComponent,
    CalificacioComentarComponent,
    TiendasComponent,
    MisTiendasFavoritasComponent,
    MisResetasFavoritasComponent,

  ],
  providers: [TituloAppService],
})
export class HomePageModule {}

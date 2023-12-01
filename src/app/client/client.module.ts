import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientPageRoutingModule } from './client-routing.module';

import { ClientPage } from './client.page';
import { StoreComponent } from './store/store.component';
import { RegisterStoreComponent } from './register-store/register-store.component';
import { MatIconModule } from '@angular/material/icon';
import { MapComponent } from './map/map.component';
import { EditTiendaComponent } from './edit-tienda/edit-tienda.component';
import { ViewStoreComponent } from './view-store/view-store.component';
import { PrincipalComponent } from './principal/principal.component';
import { AgregarPublicidadComponent } from './agregar-publicidad/agregar-publicidad.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CalificarStoreComponent } from './calificar-store/calificar-store.component';
import { MapaViewStoreComponent } from './mapa-view-store/mapa-view-store.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbRatingModule,
    MatIconModule,
    IonicModule.forRoot({ mode: 'ios' }),
    ClientPageRoutingModule,
  ],
  declarations: [
    CalificarStoreComponent,
    ClientPage,
    StoreComponent,
    RegisterStoreComponent,
    MapComponent,
    EditTiendaComponent,
    ViewStoreComponent,
    PrincipalComponent,
    AgregarPublicidadComponent,
    MapaViewStoreComponent,
    PublicidadComponent,
  ],
})
export class ClientPageModule {}

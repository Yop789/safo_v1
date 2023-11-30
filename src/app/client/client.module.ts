import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientPageRoutingModule } from './client-routing.module';

import { ClientPage } from './client.page';
import { StoreComponent } from './store/store.component';
import { RegisterStoreComponent } from './register-store/register-store.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MapComponent } from './map/map.component';
import { EditTiendaComponent } from './edit-tienda/edit-tienda.component';
import { ViewStoreComponent } from './view-store/view-store.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    IonicModule.forRoot({ mode: 'ios' }),
    ClientPageRoutingModule,
  ],
  declarations: [
    ClientPage,
    StoreComponent,
    RegisterStoreComponent,
    MapComponent,
    EditTiendaComponent,
    ViewStoreComponent,
  ],
})
export class ClientPageModule {}

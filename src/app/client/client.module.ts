import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientPageRoutingModule } from './client-routing.module';

import { ClientPage } from './client.page';
import { StoreComponent } from './store/store.component';
import { RegisterStoreComponent } from './register-store/register-store.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot({ mode: 'ios' }),
    ClientPageRoutingModule,
  ],
  declarations: [ClientPage, StoreComponent, RegisterStoreComponent],
})
export class ClientPageModule {}

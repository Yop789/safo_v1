import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { RegistroComponent } from '../registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';
import { AgregarComponent } from './agregar/agregar.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  declarations: [
    HomePage,
    RegistroComponent,
    InicioComponent,
    AgregarComponent,

  ],
})
export class HomePageModule {}

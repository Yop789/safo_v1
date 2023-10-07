git import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { RegistroComponent } from '../registro/registro.component';

import { InicioSesionComponent } from '../inicio-sesion/inicio-sesion.component';

import { RecuperarComponent } from '../recuperar/recuperar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    FormsModule,
  ],

  declarations: [HomePage, RegistroComponent, RecuperarComponent,InicioSesionComponent]


})
export class HomePageModule {}

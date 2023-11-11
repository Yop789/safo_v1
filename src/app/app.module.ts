import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { HomePageModule } from './home/home.module';
import { HomePage } from './home/home.page';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminPageModule } from './admin/admin.module';
import { ClientPageModule } from './client/client.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HomePageModule,
    NgbRatingModule,
    FormsModule,
    AdminPageModule,
    BrowserModule,
    HttpClientModule,

    ClientPageModule,
    ReactiveFormsModule,
    IonicModule.forRoot({ mode: 'ios' }),
    AppRoutingModule,
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

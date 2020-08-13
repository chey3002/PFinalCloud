import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RestService } from '../../rest.service';
import { RankingComponentComponent } from './ranking-component/ranking-component.component';
// 2. Add your credentials from step 1
const config = {
  apiKey: 'AIzaSyAyfWbGONbdJxrSwAZ7bwTfplA2jt20WJ4',
  authDomain: 'hidden-lyceum-163803.firebaseapp.com',
  databaseURL: 'https://hidden-lyceum-163803.firebaseio.com',
  projectId: 'hidden-lyceum-163803',
  storageBucket: 'hidden-lyceum-163803.appspot.com',
  messagingSenderId: '323919112915',
  appId: '1:323919112915:web:b7ec764029c3d1a5694226',
  measurementId: 'G-5WC15V79KL',
};

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    // 3. Initialize
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [AppComponent, NavbarComponent],
  providers: [RestService],
  bootstrap: [AppComponent],
})
export class AppModule {}

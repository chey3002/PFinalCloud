import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DropzoneDirective } from './dropzone.directive';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { TimerComponent } from './timer/timer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
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
  ],
  declarations: [
    AppComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    TimerComponent,
    NavbarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

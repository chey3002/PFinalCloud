import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public hser: User;

  constructor(public afAuth: AngularFireAuth) {}
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
  async loginGoogle() {
    try {
      return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (error) {
      console.log(error);
    }
  }
}

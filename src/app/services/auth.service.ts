import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: firebase.User;
  private authState: firebase.auth.UserCredential;

  get currentUserId(): string {
    return this.user !== null ? this.user.uid : '';
  }
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        const status = 'online';
        this.user = auth.user;
        this.setUserStatus(status);
        this.router.navigate(['/chat']);
      })
      .catch((error) => {
        alert('Error. ' + error.message);
      });
  }

  signup(email: string, password: string, displayName: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const status = 'offline';
        this.authState = user;
        this.setUserData(email, displayName, status);
      })
      .catch((error) => {
        alert('Error. ' + error.message);
      });
  }

  setUserData(email: string, displayName: string, status: string): void {
    const path = `user/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status,
    };
    this.db
      .object(path)
      .update(data)
      .catch((error) => console.log(error));
  }

  setUserStatus(status: string) {
    const path = `user/${this.currentUserId}`;
    console.log('PATH', path);
    const data = {
      status: status,
    };
    this.db
      .object(path)
      .update(data)
      .catch((error) => console.log(error));
  }

  setUserDisplayName(displayName: string) {
    const path = `user/${this.currentUserId}`;
    const data = {
      displayName: displayName,
    };
    this.db
      .object(path)
      .update(data)
      .catch((error) => console.log(error));
  }

  authUser() {
    return this.afAuth.authState;
  }

  logout() {
    const status = 'offline';
    this.setUserStatus(status);
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}

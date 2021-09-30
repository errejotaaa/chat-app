import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
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
        this.setUserStatus(status, auth.user.uid);
        this.router.navigate(['/chat']);
      })
      .catch((error) => {
        alert('Error. ' + error.message);
      });
  }

  signup(email: string, password: string, displayName: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        const status = 'online';
        this.setUserData(email, displayName, status, auth.user.uid);
      })
      .catch((error) => {
        alert('Error. ' + error.message);
      });
  }

  setUserData(email: string, displayName: string, status: string, id): void {
    const path = `user/${id}`;
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

  setUserStatus(status: string, id) {
    const path = `user/${id}`;
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
    this.setUserStatus(status, this.currentUserId);
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}

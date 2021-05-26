import { AngularFireAuth } from '@angular/fire/auth';
import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afauth: AngularFireAuth, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.afauth.authState.pipe(
      map((user) => {
        const isAuth = user !== null ? true : false;
        if (!isAuth) {
          this.router.navigate(['/']);
        }
        return isAuth;
      })
    );
  }
}

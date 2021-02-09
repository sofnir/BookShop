import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: any, state: RouterStateSnapshot) {
    return this.auth.fbUser$.pipe(
      map(fbUser => {
        if (fbUser) {
          return true;
        } else {
          this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      })
    );
  }
}

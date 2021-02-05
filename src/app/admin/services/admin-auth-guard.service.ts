import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(route: any, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map(appUser => appUser?.isAdmin || false)
    );
  }
}

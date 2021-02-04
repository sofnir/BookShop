import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public fbUser$: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.fbUser$ = afAuth.authState;
  }

  ngOnInit(): void {
  }

  login() {
    const returnUrl = this.activatedRouter.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(): void {
    this.afAuth.signOut();
    this.router.navigate(['']);
  }  
  
  get appUser$(): Observable<AppUser | null> {
    return this.fbUser$.pipe(switchMap(fbUser => {
      if(!fbUser) {
        return Promise.resolve(null);
      }
      return this.userService.get(fbUser.uid);
    }));
  }  
}

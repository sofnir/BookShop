import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookShop';

  constructor(auth: AuthService, router: Router, private firestore: AngularFirestore, userService: UserService) {  
    auth.fbUser$.subscribe(fbUser => {
      if (fbUser) {
        userService.addIfNotExist(fbUser);
        let returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      };    
    })
  }
}

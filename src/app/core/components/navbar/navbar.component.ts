import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/shared/models/app-user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public appUser!: AppUser | null;

  constructor(private auth: AuthService) {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isLoggedIn = false;
  public loaded = false;

  constructor(private auth: AuthService) {
    this.auth.authStateChanged.subscribe(async state => {
      this.isLoggedIn = state;
    });
  }

  public async ngOnInit() {
    this.isLoggedIn = await this.auth.authStateAsync;
    this.loaded = true;
  }

  public async logout() {
    await this.auth.logout();
  }

}

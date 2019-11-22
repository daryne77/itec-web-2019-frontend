import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isLoggedIn = false;

  constructor(private auth: AuthService) {
    this.isLoggedIn = this.auth.authState;
  }

  public ngOnInit() {
  }

}

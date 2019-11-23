import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
    public userType: 'Buyer' | 'Seller' | 'Guest';

    constructor(private actr: ActivatedRoute,
                private auth: AuthService) {
        this.userType = this.actr.snapshot.data.data.userType;
        this.auth.authStateChanged.subscribe(state => {
            if (!state) {
                this.userType = 'Guest';
            }
        });
    }
}

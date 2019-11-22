import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { User } from '@core/auth/user.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
    public isLoggedIn = false;
    public user: User;

    constructor(private auth: AuthService,
                private actr: ActivatedRoute) {

        this.actr.data.pipe(map(data => data.data)).subscribe((data) => {
            Object.assign(this, data);
        });
    }
}

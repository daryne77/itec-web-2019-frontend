import { Component } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackMessageService } from '@shared/services/snack-message.service';

@Component({
    selector: 'app-token-login',
    templateUrl: './token-login-page.component.html',
    styleUrls: ['./token-login-page.component.scss'],
})
export class TokenLoginPageComponent {
    public displayErrorMessage = false;

    constructor(private auth: AuthService,
                private actr: ActivatedRoute,
                private router: Router,
                private snack: SnackMessageService) {
        this.actr.queryParams.subscribe(params => {
            if (params.userEmail && params.token) {
                auth.login({
                    email: params.userEmail,
                    password: params.token,
                }).then(_ => {
                    this.snack.display('Autentificat cu succes!');
                    this.router.navigate(['/']);
                }, _ => {
                    this.snack.showErrorMessage('Autentificare eșuată.');
                    this.auth.logout();
                });
            } else {
                this.displayErrorMessage = true;
            }
        });
    }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackMessageService } from '@shared/services/snack-message.service';
import { ConfirmationRequestModel } from '../../user.model';
import { AccountService } from '@core/auth/account.service';

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email-page.component.html',
    styleUrls: ['./confirm-email-page.component.scss'],
})
export class ConfirmEmailPageComponent {

    private confirmationParams: ConfirmationRequestModel;

    constructor(private route: ActivatedRoute,
                private snack: SnackMessageService,
                private router: Router,
                private accountService: AccountService) {

        this.route.queryParams.subscribe(async params => {
            this.confirmationParams = {userId: params['userId'], token: params['token']};
            if (!this.validConfirmationParams) {
                await this.router.navigate(['/']);
                this.snack.display('Invalid email confirmation url.');
            } else {
                await this.sendRequest();
            }
        });
    }

    public get validConfirmationParams(): boolean {
        return this.confirmationParams && !!this.confirmationParams.userId && !!this.confirmationParams.token;
    }

    private async sendRequest() {
        try {
            const message = await this.accountService.confirmEmail(this.confirmationParams);
            this.snack.display(message);
        } catch (e) {
            this.snack.showError(e);
        }

        await this.router.navigate(['/']);
    }
}

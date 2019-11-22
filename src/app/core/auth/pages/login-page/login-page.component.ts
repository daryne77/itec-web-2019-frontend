import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { SnackMessageService } from '@shared/services/snack-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementConfig } from '@gf/model/config.interface';
import { GenericFormComponent } from '@gf/generic-form.component';

@Component({
    selector: 'app-login',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
    @ViewChild('form', { static: false })
    public form: GenericFormComponent;

    public formConfig: ElementConfig[] = [];

    public saving: boolean;

    constructor(private authService: AuthService,
                private snack: SnackMessageService,
                private router: Router,
                private actr: ActivatedRoute) {
        this.formConfig = this.actr.snapshot.data.data.formConfig;
    }

    public ngOnInit() {
    }

    public async submit() {
        if (!this.form.valid) {
            this.form.markAsTouched();
            this.snack.showErrorMessage('Check the form before submitting.');
            return;
        }
        this.saving = true;
        try {
            await this.authService.login(this.form.value);
            const returnUrl = this.actr.snapshot.queryParams['returnUrl'];
            await this.router.navigate(returnUrl ? [returnUrl] : ['/']);
            this.snack.display('Logged in successfully!');
        } catch (e) {
            this.snack.showError(e);
        }
        this.saving = false;
    }

    public formBuild(): void {
    }

}

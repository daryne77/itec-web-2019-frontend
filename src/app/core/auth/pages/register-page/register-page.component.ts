import { Component, ViewChild } from '@angular/core';
import { GenericFormComponent } from '@gf/generic-form.component';
import { ElementConfig } from '@gf/model/config.interface';
import { AccountService } from '@core/auth/account.service';
import { SnackMessageService } from '@shared/services/snack-message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
    @ViewChild('form', { static: false })
    public form: GenericFormComponent;

    public formConfig: ElementConfig[] = [];

    public displayConfirmEmailMessage = false;
    public saving = false;

    public email: string;

    constructor(private accountService: AccountService,
                private snack: SnackMessageService,
                private actr: ActivatedRoute) {
        this.formConfig = this.actr.snapshot.data.data.formConfig;
    }

    public async submit() {
        this.snack.clear();

        if (!this.form.valid) {
            this.form.markAsTouched();
            this.snack.showErrorMessage('Check the form before submitting.');
            return;
        }

        this.saving = true;

        try {
            await this.accountService.register(this.form.value);
            this.email = this.form.value.email;
            this.displayConfirmEmailMessage = true;
        } catch (e) {
            this.snack.showError(e);
        }

        this.saving = false;
    }
}

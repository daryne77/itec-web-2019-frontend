import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackMessageService } from '@shared/services/snack-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementConfig } from '@gf/model/config.interface';
import { GenericFormComponent } from '@gf/generic-form.component';
import { ProfileService } from '@core/services/entity-services/profile.service';
import { BuyerModel } from '@core/models/buyer';
import { SellerModel } from '@core/models/seller';

@Component({
    selector: 'app-login',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
    @ViewChild('form', { static: false })
    public form: GenericFormComponent;

    public formConfig: ElementConfig[] = [];
    private readonly type: 'Buyer' | 'Seller';
    private initialData: BuyerModel | SellerModel;

    public saving: boolean;

    constructor(private profileService: ProfileService,
                private snack: SnackMessageService,
                private router: Router,
                private actr: ActivatedRoute) {
        this.formConfig = this.actr.snapshot.data.data.formConfig;
        this.type = this.actr.snapshot.data.data.type;
        this.initialData = this.actr.snapshot.data.data.initialData;
    }

    public async submit() {
        if (!this.form.valid) {
            this.form.markAsTouched();
            this.snack.showErrorMessage('Verifică formularul!');
            return;
        }
        this.saving = true;
        try {
            this.initialData = await this.profileService.updateProfile(this.type, this.initialData, this.form.value);
            this.snack.display('Succes!');
        } catch (e) {
            this.snack.showError(e);
        }
        this.saving = false;
    }

    public formBuild(): void {
        this.form.patchValues(this.initialData);
    }

}

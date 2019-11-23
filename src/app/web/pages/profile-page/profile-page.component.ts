import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackMessageService } from '@shared/services/snack-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementConfig } from '@gf/model/config.interface';
import { GenericFormComponent } from '@gf/generic-form.component';
import { ProfileService } from '@core/services/entity-services/profile.service';
import { BuyerModel } from '@core/models/buyer';
import { SellerModel } from '@core/models/seller';
import { MapService } from '@core/services/map.service';
import { AddressService } from '@core/services/entity-services/address.service';
import { AddressModel } from '@core/models/address.model';

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
    private mapAddress: AddressModel;

    public saving: boolean;

    constructor(private profileService: ProfileService,
                private snack: SnackMessageService,
                private router: Router,
                private actr: ActivatedRoute,
                private mapService: MapService,
                private addressService: AddressService) {
        this.formConfig = this.actr.snapshot.data.data.formConfig;
        this.type = this.actr.snapshot.data.data.type;
        this.initialData = this.actr.snapshot.data.data.initialData;
        this.mapAddress = this.initialData.address;
        console.log(this.initialData);
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
            this.mapAddress = await this.addressService.updateAddress(this.initialData.address, this.mapAddress);
            this.snack.display('Succes!');
        } catch (e) {
            this.snack.showError(e);
        }
        this.saving = false;
    }

    public formBuild(): void {
        this.form.patchValues(this.initialData);
    }

    public async updateLocation(location) {
        const address = await this.mapService.getAddressForCoords(location);
        this.mapAddress = {
            address: address.Address.Label,
            city: address.Address.City,
            location: {
                lat: address.DisplayPosition.Latitude,
                lng: address.DisplayPosition.Longitude,
            },
        };
    }

}

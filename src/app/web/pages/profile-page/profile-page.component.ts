import { Component, ViewChild } from '@angular/core';
import { SnackMessageService } from '@shared/services/snack-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementConfig } from '@gf/model/config.interface';
import { GenericFormComponent } from '@gf/generic-form.component';
import { ProfileService } from '@core/services/entity-services/profile.service';
import { BuyerModel } from '@core/models/buyer';
import { SellerModel } from '@core/models/seller';
import { AddressSuggestion, MapService } from '@core/services/map.service';
import { AddressService } from '@core/services/entity-services/address.service';
import { AddressModel } from '@core/models/address.model';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
    @ViewChild('form', {static: false})
    public form: GenericFormComponent;

    public formConfig: ElementConfig[] = [];
    private readonly type: 'Buyer' | 'Seller';
    private initialData: BuyerModel | SellerModel;
    private mapAddress: AddressModel;

    public addressFormControl: FormControl = new FormControl();
    public suggestions: AddressSuggestion[] = [];

    public saving: boolean;
    public autoDetectAddress: boolean;

    constructor(private profileService: ProfileService,
                private snack: SnackMessageService,
                private router: Router,
                private actr: ActivatedRoute,
                private mapService: MapService,
                private addressService: AddressService) {
        this.formConfig = this.actr.snapshot.data.data.formConfig;
        this.type = this.actr.snapshot.data.data.type;
        this.initialData = this.actr.snapshot.data.data.initialData;
        if (this.initialData && this.initialData.address) {
            this.mapAddress = this.initialData.address;
            this.addressFormControl.setValue(this.mapAddress.address);
        }
        this.addressFormControl.valueChanges.subscribe(value => {
            this.addressFieldValueChanged(value);
        });
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
        if (this.initialData) {
            this.form.patchValues(this.initialData);
        }
    }

    public async updateLocation(location) {
        const address = await this.mapService.getAddressForCoords(location);
        this.mapAddress = {
            address: this.addressFormControl.value,
            city: address.Address.City,
            location: {
                lat: location.lat,
                lng: location.lng,
            },
        };
        if (this.autoDetectAddress) {
            this.addressFormControl.setValue(address.Address.Label);
        }
    }

    private async addressFieldValueChanged(value) {
        if (this.suggestions && this.suggestions.length) {
            const selectedSuggestion = this.suggestions.find(s => s.label === value);
            if (selectedSuggestion) {
                console.log('selected from list', value, selectedSuggestion);
                this.mapService.geocode(selectedSuggestion.locationId).then(gr => {
                    console.log(gr);
                    this.mapAddress = {
                        address: gr.view[0].result[0].location.address.label,
                        city: gr.view[0].result[0].location.address.city,
                        location: {
                            lat: gr.view[0].result[0].location.displayPosition.latitude,
                            lng: gr.view[0].result[0].location.displayPosition.longitude,
                        },
                    };
                    console.log(this.mapAddress);
                });
                return;
            }
        }
        this.suggestions = (await this.mapService.getSuggestions(value)).suggestions;
    }

}

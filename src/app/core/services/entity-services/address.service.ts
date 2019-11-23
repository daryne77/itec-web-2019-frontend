import { Injectable } from '@angular/core';
import { ConstantsService } from '@core/services/constants.service';
import { map } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@core/auth/auth.service';
import { PatchEntityService } from '@core/services/entity-services/patch-entity.service';
import { BuyerModel } from '@core/models/buyer';
import { SellerModel } from '@core/models/seller';
import { AddressModel } from '@core/models/address.model';

@Injectable({
    providedIn: 'root',
})
export class AddressService extends PatchEntityService<AddressModel> {
    private readonly baseUrl: string;

    constructor(
        public http: HttpClient,
        private constants: ConstantsService,
        public auth: AuthService
    ) {
        super(auth, http);
        this.baseUrl = `${this.constants.apiUrl}Profiles/`;
    }

    public async updateAddress(initialData: AddressModel, address: AddressModel)
        : Promise<AddressModel> {
        const url = `${this.baseUrl}SaveAddress`;
        return this.patch(initialData, address, url);
    }
}

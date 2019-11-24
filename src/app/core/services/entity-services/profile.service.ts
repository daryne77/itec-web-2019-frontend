import { Injectable } from '@angular/core';
import { ConstantsService } from '@core/services/constants.service';
import { map } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@core/auth/auth.service';
import { PatchEntityService } from '@core/services/entity-services/patch-entity.service';
import { BuyerModel } from '@core/models/buyer';
import { SellerModel } from '@core/models/seller';

@Injectable({
    providedIn: 'root',
})
export class ProfileService extends PatchEntityService<BuyerModel | SellerModel> {
    private readonly baseUrl: string;

    constructor(
        public http: HttpClient,
        private constants: ConstantsService,
        public auth: AuthService
    ) {
        super(auth, http);
        this.baseUrl = `${this.constants.apiUrl}Profiles/`;
    }

    public async getOwn(): Promise<BuyerModel | SellerModel> {
        const url = `${this.baseUrl}GetOwn`;
        const options = await this.auth.getOptions(true);

        try {
            return await this.http.get<{ data: any }>(url, options).pipe(map(res => res.data)).toPromise();
        } catch {
            return null;
        }
    }

    public async getSellerProfile(id: string): Promise<SellerModel> {
        const url = `${this.baseUrl}GetSellerProfile/${id}`;

        try {
            return await this.http.get<{ data: any }>(url).pipe(map(res => res.data)).toPromise();
        } catch {
            return null;
        }
    }


    public async updateProfile(type: 'Buyer' | 'Seller', initialData: BuyerModel | SellerModel, data: BuyerModel | SellerModel)
        : Promise<BuyerModel | SellerModel> {
        const url = `${this.baseUrl}Save${type}Profile`;
        return this.patch(initialData, data, url);
    }
}

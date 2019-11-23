import { Injectable } from '@angular/core';
import { ConstantsService } from '@core/services/constants.service';
import { map } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@core/auth/auth.service';
import { ProfileModel } from '@core/models/profile';
import { PatchEntityService } from '@core/services/entity-services/patch-entity.service';

@Injectable({
    providedIn: 'root',
})
export class ProfileService extends PatchEntityService<ProfileModel> {
    private readonly baseUrl: string;

    constructor(
        public http: HttpClient,
        private constants: ConstantsService,
        public auth: AuthService
    ) {
        super(auth, http);
        this.baseUrl = `${this.constants.apiUrl}Profiles/`;
    }

    public async getOwn(): Promise<ProfileModel> {
        const url = `${this.baseUrl}GetOwn`;
        const options = await this.auth.getOptions(true);

        try {
            return await this.http.get<{ data: any }>(url, options).pipe(map(res => res.data)).toPromise();
        } catch {
            return null;
        }
    }

    public async updateProfile(type: 'Buyer' | 'Seller', initialData: ProfileModel, data: ProfileModel): Promise<ProfileModel> {
        const url = `${this.baseUrl}Save${type}Profile`;
        return this.patch(initialData, data, url);
    }
}

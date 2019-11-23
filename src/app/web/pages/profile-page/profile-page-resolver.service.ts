import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ElementConfig } from '@gf/model/config.interface';
import { FormConfigService } from '@shared/services/form-config.service';
import { ProfileService } from '@core/services/entity-services/profile.service';
import { AuthService } from '@core/auth/auth.service';
import { ProfileModel } from '@core/models/profile';

@Injectable()
export class ProfilePageResolver implements Resolve<any> {
    constructor(private formConfigService: FormConfigService,
                private profileService: ProfileService,
                private auth: AuthService) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Promise<{ formConfig: ElementConfig[], type: 'Buyer' | 'Seller', initialData: ProfileModel }> {

        return new Promise(async (resolve) => {
            const isBuyer = await this.auth.hasRole('Buyer');
            const type = isBuyer ? 'Buyer' : 'Seller';
            const reqModel = isBuyer ? 'BuyerProfileViewModel' : 'SellerProfileViewModel';
            const formConfig = await this.formConfigService.getConfig(reqModel).toPromise();
            const initialData = await this.profileService.getOwn();

            resolve({
                type,
                formConfig,
                initialData,
            });
        });
    }
}

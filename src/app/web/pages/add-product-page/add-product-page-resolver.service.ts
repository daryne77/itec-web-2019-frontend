import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ElementConfig } from '@gf/model/config.interface';
import { FormConfigService } from '@shared/services/form-config.service';
import { ProfileService } from '@core/services/entity-services/profile.service';
import { AuthService } from '@core/auth/auth.service';
import { BuyerModel } from '@core/models/buyer';
import { SellerModel } from '@core/models/seller';

@Injectable()
export class AddProductPageResolver implements Resolve<any> {
    constructor(private formConfigService: FormConfigService) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Promise<{ formConfig: ElementConfig[] }> {

        return new Promise(async (resolve) => {
            const formConfig = await this.formConfigService.getConfig('ProductViewModel').toPromise();

            resolve({
                formConfig,
            });
        });
    }
}

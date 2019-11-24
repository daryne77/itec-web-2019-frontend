import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FormConfigService } from '@shared/services/form-config.service';
import { ProfileService } from '@core/services/entity-services/profile.service';
import { SellerModel } from '@core/models/seller';
import { ProductService } from '@core/services/entity-services/product.service';
import { ProductModel } from '@core/models/product';

@Injectable()
export class SellerPageResolver implements Resolve<any> {
    constructor(private formConfigService: FormConfigService,
                private productService: ProductService,
                private profileService: ProfileService) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Promise<{ seller: SellerModel, products: ProductModel[] }> {

        return new Promise(async (resolve) => {
            const { id } = route.params;
            const seller = await this.profileService.getSellerProfile(id);
            const products = await this.productService.getForSeller(id);

            resolve({
                seller,
                products,
            });
        });
    }
}

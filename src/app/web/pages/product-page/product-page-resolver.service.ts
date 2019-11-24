import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ElementConfig } from '@gf/model/config.interface';
import { FormConfigService } from '@shared/services/form-config.service';
import { ProfileService } from '@core/services/entity-services/profile.service';
import { AuthService } from '@core/auth/auth.service';
import { BuyerModel } from '@core/models/buyer';
import { SellerModel } from '@core/models/seller';
import FieldConfig from '@gf/model/field-config.interface';
import { CategoryModel } from '@core/models/category';
import { CategoryService } from '@core/services/entity-services/category.service';
import { ProductService } from '@core/services/entity-services/product.service';
import { ProductModel } from '@core/models/product';

@Injectable()
export class ProductPageResolver implements Resolve<any> {
    constructor(private formConfigService: FormConfigService,
                private auth: AuthService,
                private productService: ProductService) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Promise<{ product: ProductModel, isBuyer: boolean, isSeller: boolean }> {

        return new Promise(async (resolve) => {
            const { id } = route.params;
            const product = await this.productService.getOne(id);
            const isBuyer = await this.auth.hasRole('Buyer');
            const isSeller = await this.auth.hasRole('Seller');

            resolve({
                product,
                isBuyer,
                isSeller,
            });
        });
    }
}

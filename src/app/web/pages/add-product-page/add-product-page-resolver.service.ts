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

@Injectable()
export class AddProductPageResolver implements Resolve<any> {
    constructor(private formConfigService: FormConfigService,
                private auth: AuthService,
                private categoryService: CategoryService) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Promise<{ formConfig: ElementConfig[], photoFormConfig: ElementConfig[], categories: CategoryModel[] }> {

        return new Promise(async (resolve) => {
            const formConfig = await this.formConfigService.getConfig('ProductViewModel').toPromise();
            const photoFormConfig = await this.formConfigService.getConfig('ProductPhotoViewModel').toPromise();
            const categories = await this.categoryService.getAll();

            const cert = photoFormConfig.find(field => (field as FieldConfig).name === 'file') as FieldConfig;
            cert.authToken = `Bearer ${await this.auth.getToken()}`;

            resolve({
                formConfig,
                photoFormConfig,
                categories,
            });
        });
    }
}

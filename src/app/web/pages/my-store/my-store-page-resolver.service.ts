import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ProductModel } from '@core/models/product';
import { ProductService } from '@core/services/entity-services/product.service';

@Injectable()
export class MyStorePageResolver implements Resolve<any> {
    constructor(private productService: ProductService) {

    }

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Promise<{products: ProductModel[]}> {
        const products = await this.productService.getOwn();

        return {
            products,
        };
    }
}

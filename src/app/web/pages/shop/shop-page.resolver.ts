import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ProductModel } from '@core/models/product';
import { ProductService } from '@core/services/entity-services/product.service';
import { CategoryService } from '@core/services/entity-services/category.service';
import { CategoryModel } from '@core/models/category';

@Injectable()
export class ShopPageResolver implements Resolve<any> {
    constructor(private productService: ProductService,
                private categoryService: CategoryService) {

    }

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Promise<{products: ProductModel[], categories: CategoryModel[]}> {
        const products = await this.productService.getAll();
        const categories = await this.categoryService.getAll();

        return {
            products,
            categories,
        };
    }
}

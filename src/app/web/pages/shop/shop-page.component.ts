import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '@core/models/product';
import { CategoryModel } from '@core/models/category';

@Component({
    selector: 'app-shop-page',
    templateUrl: './shop-page.component.html',
    styleUrls: ['./shop-page.component.scss'],
})
export class ShopPageComponent {
    public products: ProductModel[];
    public categories: CategoryModel[];
    public type: 'grid' | 'list' | 'map' = 'list';
    public selectedCategory: CategoryModel;
    public displayedProducts: ProductModel[] = [];

    constructor(private actr: ActivatedRoute) {
        this.products = this.actr.snapshot.data.data.products;
        this.categories = this.actr.snapshot.data.data.categories;

        for (const p of this.products) {
            this.displayedProducts.push(p);
        }
    }

    public selectCategory(category) {
        this.selectedCategory = category;

        this.displayedProducts = this.products.filter(p => {
            if (!this.selectedCategory) {
                console.log(1);
                return true;
            }

            for (const c of p.categories) {
                if (c.id === this.selectedCategory.id) {
                    return true;
                }
            }

            return false;
        });
    }
}

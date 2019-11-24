import { Component, Input } from '@angular/core';
import { ProductModel } from '@core/models/product';
import { Router } from '@angular/router';

@Component({
    selector: 'app-products-grid',
    templateUrl: './products-grid.component.html',
    styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent {

    @Input()
    public products: ProductModel[];

    constructor(private router: Router) { }

    public goToProduct(product: ProductModel) {
        const url = `/product/${product.id}`;
        // this.router.navigate([url]);
        window.open(url, '_blank');
    }
}

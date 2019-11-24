import { Component } from '@angular/core';
import { SnackMessageService } from '@shared/services/snack-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '@core/models/product';
import { SellerModel } from '@core/models/seller';

@Component({
    selector: 'app-product-page',
    templateUrl: './seller-page.component.html',
    styleUrls: ['./seller-page.component.scss'],
})
export class SellerPageComponent {
    public seller: SellerModel;
    public products: ProductModel[];

    constructor(private snack: SnackMessageService,
                private router: Router,
                private actr: ActivatedRoute) {
        this.seller = this.actr.snapshot.data.data.seller;
        this.products = this.actr.snapshot.data.data.products;
    }
}

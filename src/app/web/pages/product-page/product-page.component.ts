import { Component } from '@angular/core';
import { SnackMessageService } from '@shared/services/snack-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '@core/models/product';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
    public product: ProductModel;
    public isBuyer: boolean;
    public isSeller: boolean;

    constructor(private snack: SnackMessageService,
                private router: Router,
                private actr: ActivatedRoute) {
        this.product = this.actr.snapshot.data.data.product;
        this.isBuyer = this.actr.snapshot.data.data.isBuyer;
        this.isSeller = this.actr.snapshot.data.data.isSeller;
    }
}

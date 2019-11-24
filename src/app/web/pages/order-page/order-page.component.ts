import { Component } from '@angular/core';
import { SnackMessageService } from '@shared/services/snack-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '@core/models/product';
import { OrderModel } from '@core/models/order';

@Component({
    selector: 'app-order-page',
    templateUrl: './order-page.component.html',
    styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent {
    public order: OrderModel;

    constructor(private snack: SnackMessageService,
                private actr: ActivatedRoute) {
        this.order = this.actr.snapshot.data.data.order;
    }
}

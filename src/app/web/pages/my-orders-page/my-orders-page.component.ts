import { Component } from '@angular/core';
import { SnackMessageService } from '@shared/services/snack-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderModel } from '@core/models/order';

@Component({
    selector: 'app-my-orders-page',
    templateUrl: './my-orders-page.component.html',
    styleUrls: ['./my-orders-page.component.scss'],
})
export class MyOrdersPageComponent {
    public orders: OrderModel[];

    constructor(private snack: SnackMessageService,
                private router: Router,
                private actr: ActivatedRoute) {
        this.orders = this.actr.snapshot.data.data.orders;
    }

    public goToOrder(order: OrderModel) {
        this.router.navigate([`/order/${order.id}`]);
    }
}
import { Component } from '@angular/core';
import { SnackMessageService } from '@shared/services/snack-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderModel } from '@core/models/order';
import { PaymentService } from '@core/services/payment.service';

@Component({
    selector: 'app-my-orders-page',
    templateUrl: './my-orders-page.component.html',
    styleUrls: ['./my-orders-page.component.scss'],
})
export class MyOrdersPageComponent {
    public orders: OrderModel[];

    constructor(private snack: SnackMessageService,
                private router: Router,
                private actr: ActivatedRoute,
                private payments: PaymentService,
                private messages: SnackMessageService) {
        this.orders = this.actr.snapshot.data.data.orders;
    }

    public goToOrder(order: OrderModel) {
        this.router.navigate([`/order/${order.id}`]);
    }

    public async pay(order: OrderModel) {
        try {
            const url = await this.payments.beginPayment(order);
            window.open(url, '_blank');
        } catch (e) {
            this.messages.showError(e);
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '@core/services/payment.service';
import { SnackMessageService } from '@shared/services/snack-message.service';

@Component({
    selector: 'app-payment-redirect-page',
    templateUrl: './payment-redirect-page.component.html',
    styleUrls: ['./payment-redirect-page.component.scss']
})
export class PaymentRedirectPageComponent implements OnInit {
    private checkoutId: string;
    public loading: boolean;

    constructor(private route: ActivatedRoute,
                private paymentsService: PaymentService,
                private messages: SnackMessageService,
                private router: Router) {
        const checkout_id = route.snapshot.queryParams.checkout_id;
        console.log(checkout_id);
        this.checkoutId = checkout_id;
    }

    public async ngOnInit(): Promise<void> {
        if (!this.checkoutId) {
            this.messages.showErrorMessage('Invalid checkout id');
            this.loading = false;
            return;
        }
        this.loading = true;
        try {
            const result = await this.paymentsService.checkPayment(this.checkoutId);

            if (result === 'authorized' || result === 'released') {
                this.messages.display('Plată procesată');
                await this.router.navigate(['/my-orders']);
                return;
            }
            this.messages.display('Nu s-a putut verifica procesarea plății.');
        } catch (e) {
            this.messages.showError(e);
        }
        this.loading = false;
    }

}

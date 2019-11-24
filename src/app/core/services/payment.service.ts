import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { OrderModel } from '../models/order';
import { ConstantsService } from './constants.service';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {


    constructor(
        private constants: ConstantsService,
        private http: HttpClient,
        private auth: AuthService) {
    }

    public async beginPayment(order: OrderModel): Promise<string> {
        const url = `${this.constants.apiUrl}Payments/CreateCheckout`;
        const data = {orderId: order.id};
        const result = await this.http.post<any>(url, data, await this.auth.getOptions(true)).toPromise();
        return result.data.checkoutUri;
    }

    public async checkPayment(paymentId: string): Promise<string> {
        const url = `${this.constants.apiUrl}Payments/CheckoutRedirect?checkout_id=` + paymentId;
        const result = await this.http.get<any>(url, await this.auth.getOptions(true)).toPromise();
        return result.data;
    }
}

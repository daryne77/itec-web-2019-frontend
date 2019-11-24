import { Injectable } from '@angular/core';
import { ConstantsService } from '@core/services/constants.service';
import { map } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@core/auth/auth.service';
import { ReferencesHelperService } from '@shared/services/references-helper.service';
import { OrderModel } from '@core/models/order';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private readonly baseUrl: string;

    constructor(
        public http: HttpClient,
        private constants: ConstantsService,
        public auth: AuthService,
        public referencesHelper: ReferencesHelperService
    ) {
        this.baseUrl = `${this.constants.apiUrl}Orders/`;
    }

    public async getOwn(): Promise<OrderModel[]> {
        const url = `${this.baseUrl}GetOwn`;
        const options = await this.auth.getOptions(true);

        const orders = await this.http.get<{ data: any }>(url, options).pipe(map(res => res.data)).toPromise();
        this.referencesHelper.populateReferences(orders);
        return orders;
    }

    public async getOne(id: string): Promise<OrderModel> {
        const url = `${this.baseUrl}GetOne/${id}`;
        const options = await this.auth.getOptions(true);
        const order = await this.http.get<{ data: any }>(url, options).pipe(map(res => res.data)).toPromise();
        this.referencesHelper.populateReferences(order);
        return order;
    }
}

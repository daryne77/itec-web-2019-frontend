import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { OrderService } from '@core/services/entity-services/order.service';
import { OrderModel } from '@core/models/order';

@Injectable()
export class MyOrdersPageResolver implements Resolve<any> {
    constructor(private orderService: OrderService) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Promise<{ orders: OrderModel[] }> {

        return new Promise(async (resolve) => {
            const orders = await this.orderService.getOwn();

            resolve({
                orders,
            });
        });
    }
}

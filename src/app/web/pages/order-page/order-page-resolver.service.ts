import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FormConfigService } from '@shared/services/form-config.service';
import { AuthService } from '@core/auth/auth.service';
import { OrderService } from '@core/services/entity-services/order.service';
import { OrderModel } from '@core/models/order';

@Injectable()
export class OrderPageResolver implements Resolve<any> {
    constructor(private formConfigService: FormConfigService,
                private auth: AuthService,
                private orderService: OrderService) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Promise<{ order: OrderModel }> {

        return new Promise(async (resolve) => {
            const { id } = route.params;
            const order = await this.orderService.getOne(id);

            resolve({
                order,
            });
        });
    }
}

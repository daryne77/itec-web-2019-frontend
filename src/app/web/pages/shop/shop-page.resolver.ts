import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { User } from '@core/auth/user.model';
import { AccountService } from '@core/auth/account.service';
import { ProductModel } from '@core/models/product';

@Injectable()
export class ShopPageResolver implements Resolve<any> {
    constructor() {

    }

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Promise<{products: ProductModel[]}> {
        const products: ProductModel[] =  [
            {
                name: 'Clătite de banane cu ouă de două sau de mai multe ori',
                price: 2,
                unit: 'Kg',
                description: 'text',
                availableUnits: 30,
                seller: {
                    name: 'Găină',
                    location: 'TM',
                },
            },
            {
                name: 'Ouă',
                price: 20,
                unit: 'Kg',
                description: 'text',
                availableUnits: 30,
                seller: {
                    name: 'Găină',
                    location: 'Cluj',
                },
            },
            {
                name: 'Ouă',
                price: 210,
                availableUnits: 30,
                unit: 'Bucată',
                description: 'text',
                seller: {
                    name: 'Găină',
                    location: 'Ceva mai lunglunglunglung lung lung',
                },
            },
            {
                name: 'Clătite de banane cu ouă',
                price: 2,
                unit: 'Kg',
                description: 'text',
                availableUnits: 30,
                seller: {
                    name: 'Găină',
                    location: 'TM',
                },
            },
            {
                name: 'Ouă',
                price: 20,
                unit: 'Kg',
                description: 'text',
                availableUnits: 30,
                seller: {
                    name: 'Găină',
                    location: 'Cluj',
                },
            },
            {
                name: 'Ouă',
                price: 210,
                availableUnits: 30,
                unit: 'Bucată',
                description: 'text',
                seller: {
                    name: 'Găină',
                    location: 'Ceva mai lung',
                },
            },
            {
                name: 'Ouă',
                price: 210,
                availableUnits: 30,
                unit: 'Bucată',
                description: 'text',
                seller: {
                    name: 'Găină',
                    location: 'Ceva mai lung',
                },
            }];

        return {
            products,
        };
    }
}

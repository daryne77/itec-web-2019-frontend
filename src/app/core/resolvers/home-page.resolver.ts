import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { User } from '@core/auth/user.model';
import { AccountService } from '@core/auth/account.service';

@Injectable()
export class HomePageResolver implements Resolve<any> {
    constructor(private authService: AuthService,
                private accountService: AccountService) {

    }

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Promise<{isLoggedIn: boolean, user: User}> {

        return new Promise (async (resolve) => {
            let isLoggedIn = false;

            try {
                isLoggedIn = await this.authService.authStateAsync;
            } catch {}

            let user = null;

            if (isLoggedIn) {
                try {
                    user = await this.accountService.getOwnAccount();
                    // user = null;
                } catch {
                    isLoggedIn = false;
                }
            }

            resolve({
                isLoggedIn,
                user,
            });
        });
    }
}

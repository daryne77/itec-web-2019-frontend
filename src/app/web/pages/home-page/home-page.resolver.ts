import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FormConfigService } from '@shared/services/form-config.service';
import { ProfileService } from '@core/services/entity-services/profile.service';
import { AuthService } from '@core/auth/auth.service';

@Injectable()
export class HomePageResolver implements Resolve<any> {
    constructor(private formConfigService: FormConfigService,
                private profileService: ProfileService,
                private auth: AuthService) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Promise<{ userType: 'Buyer' | 'Seller' | 'Guest' }> {

        return new Promise(async (resolve) => {
            const isAuthenticated = await this.auth.authStateAsync;
            let userType: 'Buyer' | 'Seller' | 'Guest' = 'Guest';
            if (isAuthenticated) {
                const isBuyer = await this.auth.hasRole('Buyer');
                userType = isBuyer ? 'Buyer' : 'Seller';
            }
            resolve({
                userType,
            });
        });
    }
}

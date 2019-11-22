import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { SnackMessageService } from '@shared/services/snack-message.service';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router,
                private snack: SnackMessageService) {

    }

    public async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> {
        if (!await this.authService.hasRole(next.data['requiredRole'])) {
            this.snack.display('You have to be ' + next.data['requiredRole'] + ' to access this page.');
            await this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}

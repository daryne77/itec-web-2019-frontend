import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@core/pages/home-page/home-page.component';
import { RegisterPageComponent } from '@core/auth/pages/register-page/register-page.component';
import { ResetPasswordPageComponent } from '@core/auth/pages/reset-password-page/reset-password-page.component';
import { ConfirmEmailPageComponent } from '@core/auth/pages/confirm-email-page/confirm-email-page.component';
import { HomePageResolver } from '@core/resolvers/home-page.resolver';
import { ForgotPasswordPageComponent } from '@core/auth/pages/forgot-password-page/forgot-password-page.component';
import { LoginPageComponent } from '@core/auth/pages/login-page/login-page.component';
import { AuthGuard } from '@core/auth/guards/auth.guard';
import { TokenLoginPageComponent } from './auth/pages/token-login/token-login-page.component';
import { RoleGuard } from '@core/auth/guards/role.guard';

const routes: Routes = [
    {
        path: '', component: HomePageComponent,
        resolve: {
            data: HomePageResolver,
        },
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'token-login',
        component: TokenLoginPageComponent,
    },
    {
        path: 'register', component: RegisterPageComponent,
        canActivate: [AuthGuard],
        data: {authenticated: false},
    },
    {
        path: 'forgot-password', component: ForgotPasswordPageComponent,
        canActivate: [AuthGuard],
        data: {authenticated: false},
    },
    {
        path: 'login', component: LoginPageComponent,
        canActivate: [AuthGuard],
        data: {authenticated: false},
    },
    {
        path: 'reset-password', component: ResetPasswordPageComponent,
        canActivate: [AuthGuard],
        data: {authenticated: false},
    },
    {
        path: 'confirm-email', component: ConfirmEmailPageComponent,
        canActivate: [AuthGuard],
        data: {authenticated: false},
    },
    {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload'}),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        HomePageResolver,
    ],
})
export class CoreRoutingModule {
}

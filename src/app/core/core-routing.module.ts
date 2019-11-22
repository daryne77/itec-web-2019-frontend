import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from '@core/auth/pages/register-page/register-page.component';
import { ResetPasswordPageComponent } from '@core/auth/pages/reset-password-page/reset-password-page.component';
import { ConfirmEmailPageComponent } from '@core/auth/pages/confirm-email-page/confirm-email-page.component';
import { HomePageResolver } from '@web/pages/home-page/home-page.resolver';
import { ForgotPasswordPageComponent } from '@core/auth/pages/forgot-password-page/forgot-password-page.component';
import { LoginPageComponent } from '@core/auth/pages/login-page/login-page.component';
import { AuthGuard } from '@core/auth/guards/auth.guard';
import { TokenLoginPageComponent } from './auth/pages/token-login/token-login-page.component';
import { RegisterPageResolver } from '@core/auth/pages/register-page/register-page.resolver';
import { LoginPageResolver } from '@core/auth/pages/login-page/login-page.resolver';

const routes: Routes = [
    {
        path: 'token-login',
        component: TokenLoginPageComponent,
    },
    {
        path: 'register', component: RegisterPageComponent,
        resolve: {
            data: RegisterPageResolver,
        },
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
        resolve: {
            data: LoginPageResolver,
        },
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
    {
        path: '',
        loadChildren: '../web/web.module#WebModule',
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
        RegisterPageResolver,
        LoginPageResolver,
    ],
})
export class CoreRoutingModule {
}

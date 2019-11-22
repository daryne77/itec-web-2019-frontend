import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from '@core/core-routing.module';
import { LoginPageComponent } from '@core/auth/pages/login-page/login-page.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { RegisterPageComponent } from '@core/auth/pages/register-page/register-page.component';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { ForgotPasswordPageComponent } from './auth/pages/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './auth/pages/reset-password-page/reset-password-page.component';
import { ConfirmEmailPageComponent } from './auth/pages/confirm-email-page/confirm-email-page.component';
import { TokenLoginPageComponent } from './auth/pages/token-login/token-login-page.component';
import { NavbarComponent } from '@core/components/navbar/navbar.component';

const matImports = [
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
];

@NgModule({
    declarations: [
        LoginPageComponent,
        FooterComponent,
        TokenLoginPageComponent,
        RegisterPageComponent,
        ForgotPasswordPageComponent,
        ResetPasswordPageComponent,
        ConfirmEmailPageComponent,
        NavbarComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        CoreRoutingModule,
        ...matImports,
        HttpClientModule,
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
    ],
})
export class CoreModule {
    /* make sure CoreModule is imported only by one NgModule the AppModule */
    constructor(
        @Optional() @SkipSelf() parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import only in AppModule');
        }
    }
}

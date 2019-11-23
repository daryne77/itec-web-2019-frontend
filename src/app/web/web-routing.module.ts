import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@web/pages/home-page/home-page.component';
import { ShopPageComponent } from '@web/pages/shop/shop-page.component';
import { ShopPageResolver } from '@web/pages/shop/shop-page.resolver';
import { ProfilePageComponent } from '@web/pages/profile-page/profile-page.component';
import { ProfilePageResolver } from '@web/pages/profile-page/profile-page.resolver';
import { AuthGuard } from '@core/auth/guards/auth.guard';
import { HomePageResolver } from '@web/pages/home-page/home-page.resolver';

const routes: Routes = [
    { path: '',  component: HomePageComponent, resolve: {
            data: HomePageResolver,
        },
    },
    { path: 'shop',  component: ShopPageComponent, resolve: {
            data: ShopPageResolver,
        },
    },
    {
        path: 'profile', component: ProfilePageComponent,
        resolve: {
            data: ProfilePageResolver,
        },
        canActivate: [AuthGuard],
        data: {authenticated: true},
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        ShopPageResolver,
        ProfilePageResolver,
        HomePageResolver,
    ],
})
export class WebRoutingModule { }

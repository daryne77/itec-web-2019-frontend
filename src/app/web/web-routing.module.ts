import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@web/pages/home-page/home-page.component';
import { ShopPageComponent } from '@web/pages/shop/shop-page.component';
import { ShopPageResolver } from '@web/pages/shop/shop-page.resolver';

const routes: Routes = [
    { path: '',  component: HomePageComponent },
    { path: 'shop',  component: ShopPageComponent, resolve: {
            data: ShopPageResolver,
        },
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
    ],
})
export class WebRoutingModule { }

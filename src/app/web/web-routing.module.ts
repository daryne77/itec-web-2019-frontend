import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@web/pages/home-page/home-page.component';
import { ShopPageComponent } from '@web/pages/shop/shop-page.component';
import { ShopPageResolver } from '@web/pages/shop/shop-page.resolver';
import { ProfilePageComponent } from '@web/pages/profile-page/profile-page.component';
import { ProfilePageResolver } from '@web/pages/profile-page/profile-page.resolver';
import { AuthGuard } from '@core/auth/guards/auth.guard';
import { HomePageResolver } from '@web/pages/home-page/home-page.resolver';
import { MyStorePageComponent } from '@web/pages/my-store/my-store-page.component';
import { MyStorePageResolver } from '@web/pages/my-store/my-store-page-resolver.service';
import { RoleGuard } from '@core/auth/guards/role.guard';
import { AddProductPageComponent } from '@web/pages/add-product-page/add-product-page.component';
import { AddProductPageResolver } from '@web/pages/add-product-page/add-product-page-resolver.service';
import { ProductPageResolver } from '@web/pages/product-page/product-page-resolver.service';
import { ProductPageComponent } from '@web/pages/product-page/product-page.component';
import { SellerPageComponent } from '@web/pages/seller-page/seller-page.component';
import { SellerPageResolver } from '@web/pages/seller-page/seller-page-resolver.service';
import { MyOrdersPageComponent } from '@web/pages/my-orders-page/my-orders-page.component';
import { MyOrdersPageResolver } from '@web/pages/my-orders-page/my-orders-page-resolver.service';
import { OrderPageComponent } from '@web/pages/order-page/order-page.component';
import { OrderPageResolver } from '@web/pages/order-page/order-page-resolver.service';

const routes: Routes = [
    { path: '',  component: HomePageComponent, resolve: {
            data: HomePageResolver,
        },
    },
    { path: 'shop',  component: ShopPageComponent, resolve: {
            data: ShopPageResolver,
        },
    },
    { path: 'product/:id',  component: ProductPageComponent, resolve: {
            data: ProductPageResolver,
        },
    },
    { path: 'seller/:id',  component: SellerPageComponent, resolve: {
            data: SellerPageResolver,
        },
    },
    { path: 'order/:id',  component: OrderPageComponent, resolve: {
            data: OrderPageResolver,
        },
    },
    { path: 'my-store',  component: MyStorePageComponent, resolve: {
            data: MyStorePageResolver,
        },
        canActivate: [AuthGuard, RoleGuard],
        data: {authenticated: true, requiredRole: 'Seller'},
    },
    { path: 'my-orders',  component: MyOrdersPageComponent, resolve: {
            data: MyOrdersPageResolver,
        },
        canActivate: [AuthGuard, RoleGuard],
        data: {authenticated: true, requiredRole: 'Buyer'},
    },
    { path: 'add-product',  component: AddProductPageComponent, resolve: {
            data: AddProductPageResolver,
        },
        canActivate: [AuthGuard, RoleGuard],
        data: {authenticated: true, requiredRole: 'Seller'},
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
        MyStorePageResolver,
        AddProductPageResolver,
        ProductPageResolver,
        SellerPageResolver,
        MyOrdersPageResolver,
        OrderPageResolver,
    ],
})
export class WebRoutingModule { }

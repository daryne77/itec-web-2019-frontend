import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { WebRoutingModule } from '@web/web-routing.module';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatTooltipModule,
} from '@angular/material';
import { HomePageComponent } from '@web/pages/home-page/home-page.component';
import { ShopPageComponent } from './pages/shop/shop-page.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsGridComponent } from './components/products-grid/products-grid.component';
import { ProfilePageComponent } from '@web/pages/profile-page/profile-page.component';
import { GenericFormModule } from '@gf/generic-form.module';
import { SearchAddressMapComponent } from '@web/components/search-address-map/search-address-map.component';
import { ProductsMapComponent } from '@web/components/products-map/products-map.component';
import { MyStorePageComponent } from '@web/pages/my-store/my-store-page.component';
import { AddProductPageComponent } from '@web/pages/add-product-page/add-product-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductPageComponent } from '@web/pages/product-page/product-page.component';
import { CarouselModule } from 'ngx-bootstrap';
import { SellerPageComponent } from '@web/pages/seller-page/seller-page.component';
import { SellerAddressMapComponent } from '@web/components/seller-address-map/seller-address-map.component';
import { MyOrdersPageComponent } from '@web/pages/my-orders-page/my-orders-page.component';
import { OrderPageComponent } from '@web/pages/order-page/order-page.component';

const matImports = [
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
];

const bootstrapImports = [
    CarouselModule,
];

@NgModule({
    declarations: [
        HomePageComponent,
        ShopPageComponent,
        ProfilePageComponent,
        ProductsListComponent,
        ProductsGridComponent,
        ProductsMapComponent,
        MyStorePageComponent,
        SearchAddressMapComponent,
        AddProductPageComponent,
        ProductPageComponent,
        SellerPageComponent,
        SellerAddressMapComponent,
        MyOrdersPageComponent,
        OrderPageComponent,
    ],
    imports: [
        CommonModule,
        WebRoutingModule,
        SharedModule,
        FormsModule,
        FontAwesomeModule,
        GenericFormModule,
        ...bootstrapImports,
        ...matImports,
        MatFormFieldModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatInputModule,
    ],
})
export class WebModule {
}

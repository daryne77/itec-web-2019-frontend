import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { WebRoutingModule } from '@web/web-routing.module';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule, MatInputModule,
  MatTooltipModule
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

const matImports = [
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatCheckboxModule,
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
    ],
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule,
    FormsModule,
    FontAwesomeModule,
    GenericFormModule,
    ...matImports,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class WebModule { }

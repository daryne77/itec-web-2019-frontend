import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { WebRoutingModule } from '@web/web-routing.module';
import { MatButtonModule, MatCardModule, MatTooltipModule } from '@angular/material';
import { HomePageComponent } from '@web/pages/home-page/home-page.component';
import { ShopPageComponent } from './pages/shop/shop-page.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsGridComponent } from './components/products-grid/products-grid.component';
import { ProfilePageComponent } from '@web/pages/profile-page/profile-page.component';
import { GenericFormModule } from '@gf/generic-form.module';
import { SearchAddressMapComponent } from '@web/components/search-address-map/search-address-map.component';

const matImports = [
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
];

@NgModule({
    declarations: [
        HomePageComponent,
        ShopPageComponent,
        ProfilePageComponent,
        ProductsListComponent,
        ProductsGridComponent,
        SearchAddressMapComponent,
    ],
    imports: [
        CommonModule,
        WebRoutingModule,
        SharedModule,
        FontAwesomeModule,
        GenericFormModule,
        ...matImports,
    ],
})
export class WebModule { }

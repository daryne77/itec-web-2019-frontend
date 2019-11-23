import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { WebRoutingModule } from '@web/web-routing.module';
import { MatButtonModule, MatCardModule, MatTooltipModule } from '@angular/material';
import { HomePageComponent } from '@web/pages/home-page/home-page.component';
import { ShopPageComponent } from './pages/shop/shop-page.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const matImports = [
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
];

@NgModule({
    declarations: [
        HomePageComponent,
        ShopPageComponent,
        ProductsListComponent,
    ],
    imports: [
        CommonModule,
        WebRoutingModule,
        SharedModule,
        FontAwesomeModule,
        ...matImports,
    ],
})
export class WebModule { }

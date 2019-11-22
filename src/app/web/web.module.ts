import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { WebRoutingModule } from '@web/web-routing.module';
import { MatButtonModule, MatTooltipModule } from '@angular/material';
import { HomePageComponent } from '@web/pages/home-page/home-page.component';

const matImports = [
    MatButtonModule,
    MatTooltipModule,
];

@NgModule({
    declarations: [
        HomePageComponent,
    ],
    imports: [
        CommonModule,
        WebRoutingModule,
        SharedModule,
        ...matImports,
    ],
})
export class WebModule { }

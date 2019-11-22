import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@web/pages/home-page/home-page.component';
import { HomePageResolver } from '@web/pages/home-page/home-page.resolver';

const routes: Routes = [
    { path: '',  component: HomePageComponent, resolve: {
            data: HomePageResolver,
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
})
export class WebRoutingModule { }

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '@core/models/product';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
})
export class ShopPageComponent {
  public products: ProductModel[];

  constructor(private actr: ActivatedRoute) {
    this.products = this.actr.snapshot.data.data.products;
  }
}

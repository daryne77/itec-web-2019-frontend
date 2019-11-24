import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '@core/models/product';

@Component({
  selector: 'app-my-store-page',
  templateUrl: './my-store-page.component.html',
  styleUrls: ['./my-store-page.component.scss'],
})
export class MyStorePageComponent {
  public products: ProductModel[];

  constructor(private actr: ActivatedRoute) {
    this.products = this.actr.snapshot.data.data.products;
  }
}

import { Component, Input } from '@angular/core';
import { ProductModel } from '@core/models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {

  @Input()
  public products: ProductModel[];

  constructor() { }

}

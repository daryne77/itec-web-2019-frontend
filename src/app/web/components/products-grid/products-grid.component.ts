import { Component, Input } from '@angular/core';
import { ProductModel } from '@core/models/product';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent {

  @Input()
  public products: ProductModel[];

  constructor() { }

}

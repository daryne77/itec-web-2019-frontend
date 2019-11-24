import { Component, Input } from '@angular/core';
import { ProductModel } from '@core/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {

  @Input()
  public products: ProductModel[];

  @Input()
  public isSeller: boolean;

  constructor(private router: Router) { }

  public goToProduct(product: ProductModel) {
    this.router.navigate([`/product/${product.id}`]);
  }

}

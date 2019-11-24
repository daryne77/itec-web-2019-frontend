import { ProductModel } from '@core/models/product';

export interface CartItemModel {
    product: ProductModel;
    quantity: number;
}

import { EntityModel } from '@gf/model/entity.model';
import { SellerModel } from '@core/models/seller';
import { ProductModel } from '@core/models/product';

export class OrderModel extends EntityModel {
    public seller: SellerModel;
    public totalPrice: number;
    public state: string;
    public paymentInformation: string;
    public products: { product: ProductModel; unitPrice: number; quantity: 100; unit: string; }[];
}

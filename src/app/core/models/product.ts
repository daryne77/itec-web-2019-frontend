import { EntityModel } from '@gf/model/entity.model';
import { SellerModel } from '@core/models/seller';
import { CategoryModel } from '@core/models/category';

export class ProductModel extends EntityModel {
    public name: string;
    public description: string;
    public thumbnail?: string;
    public photos?: string[];
    public price: number;
    public unit: 'Kg' | 'Litru' | 'Bucată';
    public seller: SellerModel;
    public availableUnits: number;
    public categories: CategoryModel[];
}

// poza mare mica, nume, pret, seller,
import { EntityModel } from '@gf/model/entity.model';
import { SellerModel } from '@core/models/seller';

export class ProductModel extends EntityModel {
    public name: string;
    public description: string;
    public thumbnail?: string;
    public photos?: string[];
    public price: number;
    public unit: 'Kg' | 'Liter' | Bucată;
    public seller: SellerModel;
    public availableUnits: number;
}

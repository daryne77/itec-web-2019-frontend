import { EntityModel } from '@gf/model/entity.model';

export class CategoryModel extends EntityModel {
    public name: string;
    public parent: CategoryModel;
    public fullName: string;
    public checked?: boolean;
    public children?: CategoryModel[];
}

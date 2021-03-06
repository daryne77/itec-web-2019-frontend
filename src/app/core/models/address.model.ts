import { EntityModel } from '@gf/model/entity.model';

export class AddressModel extends EntityModel {
    public address: string;
    public city: string;
    public location: {
        lat: number,
        lng: number,
    };
}

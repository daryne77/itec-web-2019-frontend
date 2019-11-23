import { EntityModel } from '@gf/model/entity.model';
import { AddressModel } from '@core/models/address.model';

export class ProfileModel extends EntityModel {
    public name: string;
    public phoneNumber: string;
    public address: AddressModel;
}

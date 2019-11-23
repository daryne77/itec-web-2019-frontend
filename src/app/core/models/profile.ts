import { EntityModel } from '@gf/model/entity.model';
import { AddressModel } from '@core/models/address.model';

export class ProfileModel extends EntityModel {
    public name: string;
    public location: string;
    public type: 'Private' | 'Company';
    public phoneNumber: string;
    public address: AddressModel;
}

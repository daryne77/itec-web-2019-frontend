import { ProfileModel } from '@core/models/profile';

export class BuyerModel extends ProfileModel {
    public type: 'Private' | 'Company';
}

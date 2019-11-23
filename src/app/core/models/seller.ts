import { ProfileModel } from '@core/models/profile';

export class SellerModel extends ProfileModel {
    public targetType: 'Private' | 'Company';
}

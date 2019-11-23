import { Injectable } from '@angular/core';
import { ConstantsService } from '@core/services/constants.service';
import { map } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@core/auth/auth.service';
import { ProductModel } from '@core/models/product';
import { ReferencesHelperService } from '@shared/services/references-helper.service';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private readonly baseUrl: string;

    constructor(
        public http: HttpClient,
        private constants: ConstantsService,
        public auth: AuthService,
        public referencesHelper: ReferencesHelperService
    ) {
        this.baseUrl = `${this.constants.apiUrl}Products/`;
    }

    public async getAll(): Promise<ProductModel[]> {
        const url = `${this.baseUrl}GetAll`;
        const options = await this.auth.getOptions(true);

        const products = await this.http.get<{ data: any }>(url, options).pipe(map(res => res.data)).toPromise();
        this.referencesHelper.populateReferences(products);
        return products;
    }
}

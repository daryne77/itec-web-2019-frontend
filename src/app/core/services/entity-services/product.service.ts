import { Injectable } from '@angular/core';
import { ConstantsService } from '@core/services/constants.service';
import { map } from 'rxjs/internal/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '@core/auth/auth.service';
import { ProductModel } from '@core/models/product';
import { ReferencesHelperService } from '@shared/services/references-helper.service';
import { CategoryModel } from '@core/models/category';

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

    public async getOwn(): Promise<ProductModel[]> {
        const url = `${this.baseUrl}GetOwn`;
        const options = await this.auth.getOptions(true);

        const products = await this.http.get<{ data: any }>(url, options).pipe(map(res => res.data)).toPromise();
        this.referencesHelper.populateReferences(products);
        return products;
    }

    public async create(product: ProductModel): Promise<ProductModel> {
        const url = `${this.baseUrl}Add`;
        const options = await this.auth.getOptions(true);

        return await this.http.post<{ data: any }>(url, product, options).pipe(map(res => res.data)).toPromise();
    }

    public async setPhotos(product: ProductModel, thumbnailId: string, photos: { id: string }[]): Promise<ProductModel> {
        const url = `${this.baseUrl}SetPhotos/${product.id}`;
        const headers = await this.auth.getHeaders(true);
        const params = new HttpParams({
            fromObject: {
                thumbnailId,
            },
        });

        return await this.http.post<{ data: any }>(url, photos, { headers, params }).pipe(map(res => res.data)).toPromise();
    }

    public async setCategories(product: ProductModel, categories: CategoryModel[]): Promise<ProductModel> {
        const url = `${this.baseUrl}SetCategories/${product.id}`;
        const options = await this.auth.getOptions(true);

        return await this.http.post<{ data: any }>(url, categories, options).pipe(map(res => res.data)).toPromise();
    }

    public async getOne(id: string): Promise<ProductModel> {
        const url = `${this.baseUrl}GetOne/${id}`;

        return await this.http.get<{ data: any }>(url).pipe(map(res => res.data)).toPromise();
    }
}

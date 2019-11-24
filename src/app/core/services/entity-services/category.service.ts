import { Injectable } from '@angular/core';
import { ConstantsService } from '@core/services/constants.service';
import { map } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { ReferencesHelperService } from '@shared/services/references-helper.service';
import { CategoryModel } from '@core/models/category';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private readonly baseUrl: string;

    constructor(
        public http: HttpClient,
        private constants: ConstantsService,
        public referencesHelper: ReferencesHelperService
    ) {
        this.baseUrl = `${this.constants.apiUrl}Categories/`;
    }

    public async getAll(): Promise<CategoryModel[]> {
        const url = `${this.baseUrl}GetAll`;

        const categories = await this.http.get<{ data: any }>(url).pipe(map(res => res.data)).toPromise();
        this.referencesHelper.populateReferences(categories);
        return categories;
    }
}

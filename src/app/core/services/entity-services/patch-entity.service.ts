import { EntityModel } from '@gf/model/entity.model';
import { map } from 'rxjs/internal/operators';
import { AuthService } from '@core/auth/auth.service';
import { HttpClient } from '@angular/common/http';

export class PatchEntityService<T extends EntityModel> {
    public constructor(public auth: AuthService,
                       public http: HttpClient) {

    }

    public async patch(initialData: T, data: T, url): Promise<T> {
        const options = await this.auth.getOptions(true);
        const propertiesToUpdate = {};
        Object.entries(data).forEach(([key, val]) => {
            if (!initialData || val !== initialData[key]) {
                propertiesToUpdate[key] = true;
            }
        });
        const obj = {
            id: data.id,
            model: data,
            propertiesToUpdate,
        };
        return this.http.patch<{ data: T }>(url, obj, options).pipe(map(res => res.data)).toPromise();
    }
}

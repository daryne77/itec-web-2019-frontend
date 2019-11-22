import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ElementConfig } from '@gf/model/config.interface';
import { FormConfigService } from '@shared/services/form-config.service';

@Injectable()
export class LoginPageResolver implements Resolve<any> {
    constructor(private formConfigService: FormConfigService) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<{ formConfig: ElementConfig[] }> {
        return new Promise(async (resolve) => {
                const formConfig = await this.formConfigService.getConfig('LoginRequestModel').toPromise();
                resolve({
                    formConfig,
                });
            }
        );
    }
}

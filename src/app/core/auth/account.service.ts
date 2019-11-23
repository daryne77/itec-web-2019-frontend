import { Injectable } from '@angular/core';
import { ConfirmationRequestModel, ForgotPasswordModel } from '@core/auth/user.model';
import { map } from 'rxjs/internal/operators';
import { ConstantsService } from '@core/services/constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@core/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private readonly baseUrl: string;

    constructor(private http: HttpClient,
                private constants: ConstantsService,
                private authService: AuthService) {
        this.baseUrl = `${this.constants.apiUrl}Auth/`;
    }

    public register(data: any): Promise<any> {
        const url = `${this.baseUrl}RegisterShop`;
        const httpOptions = {
            headers: new HttpHeaders({
                'X-Auth-Path-Prefix': '/',
            }),
        };
        return this.http.post<{ data: any }>(url, data, httpOptions).toPromise();
    }

    public async forgotPassword(requestModel: ForgotPasswordModel): Promise<any> {
        const url = `${this.baseUrl}ForgotPassword`;
        const response = await this.http.post<{ data: any }>(url, requestModel).toPromise();
        return response && response.data;
    }

    public async resetPassword(requestModel: any): Promise<string> {
        const url = `${this.baseUrl}ResetPassword`;
        const response = await this.http.post<{ data: any }>(url, requestModel).toPromise();
        if (response && response.data && response.data.session) {
            await this.authService.saveSession(response.data.session);
            return response.data.message;
        }
        return response && response.data;
    }

    public async changePassword(requestModel: any): Promise<any> {
        const url = `${this.baseUrl}ChangePassword`;
        const options = await this.authService.getOptions(true);
        return this.http.post<{ data: any }>(url, requestModel, options).toPromise();
    }

    public async updateAccount(requestModel: any): Promise<any> {
        const url = `${this.baseUrl}UpdateOwn`;
        const options = await this.authService.getOptions(true);
        return this.http.post<{ data: any }>(url, requestModel, options).toPromise();
    }

    public async confirmEmail(model: ConfirmationRequestModel): Promise<string> {
        const url = this.baseUrl + 'ConfirmEmail';
        const response = await this.http.post<{ data: any }>(url, model).toPromise();
        if (response && response.data && response.data.session) {
            await this.authService.saveSession(response.data.session);
            return response.data.message;
        }
        return response && response.data;
    }
}

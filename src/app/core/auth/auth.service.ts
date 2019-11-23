import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from '@core/services/constants.service';
import { map, tap } from 'rxjs/internal/operators';
import {
    AuthSession,
    LoginRequestModel
} from '@core/auth/user.model';

import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private static readonly tokenStorageKey: string = 'token';
    private static readonly sessionStorageKey: string = 'session';

    private readonly baseUrl: string;

    private _token: string;
    private _session: AuthSession;

    private _authState: EventEmitter<boolean> = new EventEmitter();

    constructor(private http: HttpClient,
                private constants: ConstantsService,
                private storage: LocalStorage,
                private router: Router) {
        this.baseUrl = `${this.constants.apiUrl}Auth/`;
        this.loadSession();
    }

    public get authStateChanged(): EventEmitter<boolean> {
        return this._authState;
    }

    public get authState(): boolean {
        return this.localAuthState;
    }

    public get authStateAsync(): Promise<boolean> {
        return new Promise(async (resolve) => {
            if (this.localAuthState) {
                resolve(true);
            } else {
                await this.loadSession();
                resolve(this.localAuthState);
            }
        });
    }

    public async hasRole(role: string): Promise<boolean> {
        const session = await this.getSession();

        if (!session.roles) {
            return false;
        }

        return session.roles.indexOf(role) !== -1;
    }

    public async getRoles(): Promise<string[]> {
        const session = await this.getSession();

        if (!session.roles) {
            return [];
        }

        return session.roles.split(',');
    }

    public get localAuthState(): boolean {
        return !!this._token;
    }

    public async getOptions(needsAuth?: boolean): Promise<{ headers?: HttpHeaders }> {
        return {headers: await this.getHeaders(needsAuth)};
    }

    public async getHeaders(needsAuth?: boolean): Promise<HttpHeaders> {
        if (!needsAuth) {
            return new HttpHeaders();
        }
        const session = await this.getSession();

        if (!session) {
            return new HttpHeaders();
        }

        return new HttpHeaders().append('Authorization', `${session.tokenType} ${session.token}`);
    }

    public async login(requestModel: LoginRequestModel): Promise<any> {
        const url = `${this.baseUrl}Login`;
        return this.http.post<{ data: AuthSession }>(url, requestModel)
            .pipe(tap(async res => {
                const authSession = res.data;
                // console.log(authSession);
                await this.saveSession(authSession);
            }))
            .pipe(map(() => {
                return true;
            })).toPromise();
    }

    public async logout(): Promise<void> {
        await this.saveSession();
        await this.router.navigate(['/']);
    }

    public async getToken(): Promise<string> {
        if (!this._token) {
            await this.loadSession();
        }
        return this._token;
    }

    public async getSession(): Promise<AuthSession> {
        if (!this._session) {
            this._session = <AuthSession>await this.storage.getItem(AuthService.sessionStorageKey).toPromise();
        }
        return this._session;
    }

    public async saveSession(authSession?: AuthSession): Promise<void> {
        if (authSession) {
            await this.storage.setItem(AuthService.tokenStorageKey, authSession.token).toPromise();
            await this.storage.setItem(AuthService.sessionStorageKey, authSession).toPromise();
        } else {
            await this.storage.removeItem(AuthService.tokenStorageKey).toPromise();
            await this.storage.removeItem(AuthService.sessionStorageKey).toPromise();
        }
        await this.loadSession();
    }

    private async loadSession(): Promise<void> {
        const initialStatus = !!this._token;
        this._token = <string>await this.storage.getItem(AuthService.tokenStorageKey).toPromise();
        if (this._token) {
            this._session = <AuthSession>await this.storage.getItem(AuthService.sessionStorageKey).toPromise();
        }
        const differentStatus = initialStatus !== !!this._token;
        if (differentStatus) {
            this._authState.emit(!!this._token);
        }
    }

}

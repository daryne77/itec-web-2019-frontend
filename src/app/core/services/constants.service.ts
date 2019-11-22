import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ConstantsService {
    public get apiUrl() {
        return '/api/';
    }
}


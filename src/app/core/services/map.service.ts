import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root',
})
export class MapService {

    public hereAppId = 'U5MLmxgRhispjxTAbGVn';
    public hereAppCode = 'FuEyUVMn-OaU2bwv21Ufhw';

    public constructor(private http: HttpClient) {

    }

    public getSuggestions(query: string): Promise<{ suggestions: AddressSuggestion[] }> {
        const params = new HttpParams({
            fromObject: {
                app_id: this.hereAppId,
                app_code: this.hereAppCode,
                query,
            },
        });

        const url = `http://autocomplete.geocoder.api.here.com/6.2/suggest.json`;
        return this.http.get<{ suggestions: AddressSuggestion[] }>(url, {params}).toPromise();
    }

    public getAddressForCoords(coords: { lat: number, lng: number }): Promise<any> {
        const {lat, lng} = coords;

        const params = new HttpParams({
            fromObject: {
                app_id: this.hereAppId,
                app_code: this.hereAppCode,
                mode: 'retrieveAddresses',
                maxresults: '1',
                gen: '9',
                prox: `${lat},${lng},100`,
            },
        });

        const url = `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json`;
        return this.http.get<any>(url, {params}).pipe(map(res => res.Response.View[0].Result[0].Location)).toPromise();
    }

    public async geocode(locationId: string): Promise<GeocodeResponse> {

        const params = new HttpParams({
            fromObject: {
                app_id: this.hereAppId,
                app_code: this.hereAppCode,
                locationid: locationId,
                jsonattributes: '1',
                gen: '9',
            },
        });

        const url = `http://geocoder.api.here.com/6.2/geocode.json`;
        const res = await this.http.get<{ response: GeocodeResponse }>(url, {params}).toPromise();
        return res.response;
    }
}

export interface AddressSuggestion {
    label: string;
    locationId?: string;
}

export interface GeocodeResponse {
    metaInfo: { timestamp: string };
    view: {
        result: {
            location: {
                address: {
                    city: string,
                    country: string,
                    county: string,
                    label: string,
                },
                displayPosition: {
                    latitude: number,
                    longitude: number
                }
            }
        }[]
    }[];
}

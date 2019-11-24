import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';

declare var H: any;

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

    public buildSvgStringWith(color: string, text: string) {
        const svgMarkup = '<svg style="left:-14px;top:-36px;"' +
            ' xmlns="http://www.w3.org/2000/svg" width="28px" height="36px" >' +
            '<path d="M 19 31 C 19 32.7 16.3 34 13 34 C 9.7 34 7 32.7 7 31 C 7 29.3 9.7 ' +
            '28 13 28 C 16.3 28 19 29.3 19 31 Z" fill="#000" fill-opacity=".2"></path>' +
            '<path d="M 13 0 C 9.5 0 6.3 1.3 3.8 3.8 C 1.4 7.8 0 9.4 0 12.8 C 0 16.3 1.4 ' +
            '19.5 3.8 21.9 L 13 31 L 22.2 21.9 C 24.6 19.5 25.9 16.3 25.9 12.8 C 25.9 9.4 24.6 ' +
            '6.1 22.1 3.8 C 19.7 1.3 16.5 0 13 0 Z" fill="#fff"></path>' +
            '<path d="M 13 2.2 C 6 2.2 2.3 7.2 2.1 12.8 C 2.1 16.1 3.1 18.4 5.2 20.5 L ' +
            '13 28.2 L 20.8 20.5 C 22.9 18.4 23.8 16.2 23.8 12.8 C 23.6 7.07 20 2.2 ' +
            '13 2.2 Z" fill="${COLOR}"></path>' +
            '<text transform="matrix( 1 0 0 1 13 18 )" x="0" y="0" fill-opacity="1" ' +
            'fill="#fff" text-anchor="middle" ' +
            'font-weight="bold" font-size="13px" font-family="arial">${TEXT}</text></svg>';
        return svgMarkup.replace('${COLOR}', color).replace('${TEXT}', text);
    }

    public buildMarkerWith(location: { lat: number, lng: number, }, color: string, text: string) {
        const svg = this.buildSvgStringWith(color, text).replace('${COLOR}', 'blue').replace('${TEXT}', 'P');
        const icon = new H.map.Icon(svg);
        const marker = new H.map.Marker(location, {icon: icon});
        return marker;
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

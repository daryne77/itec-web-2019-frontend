import {
    Component,
    ElementRef,
    Inject,
    Input,
    OnInit,
    PLATFORM_ID,
    ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '@env/environment';
import { AddressModel } from '@core/models/address.model';

declare var H;

@Component({
    selector: 'app-seller-address-map',
    templateUrl: './seller-address-map.component.html',
    styleUrls: ['./seller-address-map.component.scss'],
})
export class SellerAddressMapComponent implements OnInit {

    public constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    @Input()
    public address: AddressModel;

    @ViewChild('map', {static: true})
    public mapElement: ElementRef;
    private platform: any;
    private map: any;
    private behavior: any;
    // @ts-ignore
    private marker: H.map.Marker;

    public hereApiKey = '2yOL_eu8-2JkY7WtJSLNdeOC7FDqzjqDEGHYEFTdQYA';

    public loaded = false;
    private readonly isBrowser: boolean;

    public ngOnInit() {
        if (!this.isBrowser) {
            return;
        }
        this.checkHereMapsLoaded();
    }

    private get mapLoaded(): boolean {
        return typeof H !== 'undefined' && H && H.service && H.service.Platform;
    }

    private async checkHereMapsLoaded() {
        if (!this.mapLoaded) {
            setTimeout(() => {
                this.checkHereMapsLoaded();
            }, 500);
            return;
        }
        this.buildPlatform();
        this.buildMap();
        this.addMarker(this.address.location);
    }

    private buildPlatform() {
        this.loaded = true;
        this.platform = new H.service.Platform({
            apikey: this.hereApiKey,
            useHTTPS: environment.production,
        });
    }

    private buildMap() {
        const defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.vector.normal.map,
            {
                zoom: 10,
                center: this.address.location,
            }
        );

        window.addEventListener('resize', () => this.map.getViewPort().resize());
    }

    private addMarker(position) {
        this.marker = new H.map.Marker(position);
        this.map.addObject(this.marker);
        this.map.setCenter(position);
    }
}

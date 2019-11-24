import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { environment } from '@env/environment';
import { ProductModel } from '@core/models/product';
import { AddressModel } from '@core/models/address.model';
import { ProfileService } from '@core/services/entity-services/profile.service';
import { BuyerModel } from '@core/models/buyer';
import { MapService } from '@core/services/map.service';

declare var H: any;

@Component({
    selector: 'app-products-map',
    templateUrl: './products-map.component.html',
    styleUrls: ['./products-map.component.scss'],
})
export class ProductsMapComponent implements OnInit, OnChanges {

    public constructor(
        private profileService: ProfileService,
        private mapsService: MapService) {

        this.svgMarkup = '<svg width="30" height="30" ' +
            'xmlns="http://www.w3.org/2000/svg">' +
            '<rect stroke="white" fill="#d50000" x="1" y="1" width="22" ' +
            'height="22" /></svg>';
    }

    private get mapLoaded(): boolean {
        return typeof H !== 'undefined' && H && H.service && H.service.Platform;
    }

    public svgMarkup: string;

    @Input() public products: ProductModel[];

    @ViewChild('map', {static: true})
    public mapElement: ElementRef;
    private platform: any;
    private map: any;
    private ui: any;
    private behavior: any;
    // @ts-ignore
    private markersGroup = new H.map.Group();

    public hereApiKey = '2yOL_eu8-2JkY7WtJSLNdeOC7FDqzjqDEGHYEFTdQYA';

    public loaded = false;

    private myProfile: BuyerModel;

    private profileMarker: any;

    private markersGroupAdded: boolean;

    public selectedBag: LocationBag;

    public async ngOnInit(): Promise<void> {
        this.checkHereMapsLoaded();
        try {
            this.myProfile = await this.profileService.getOwn() as BuyerModel;
            if (this.mapLoaded) {
                this.createProfileMarker();
            }
        } catch (e) {

        }
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
        if (this.products) {
            this.addProductMarkers();
        }
    }

    private buildPlatform() {
        this.loaded = true;
        this.platform = new H.service.Platform({
            apikey: this.hereApiKey,
            useHTTPS: environment.production,
        });
    }

    private addProductMarkers() {
        const locations: LocationBag[] = [];
        for (const product of this.products) {
            let location = locations.find(l => l.address === product.seller.address);
            if (!location) {
                location = {address: product.seller.address, products: []};
                locations.push(location);
            }
            location.products.push(product);
        }
        this.markersGroup.removeAll();
        if (this.profileMarker) {
            this.markersGroup.addObject(this.profileMarker);
        }
        for (const location of locations) {
            const marker = this.mapsService.buildMarkerWith(location.address.location, 'red', 'P');
            marker.setData(location);
            this.markersGroup.addObject(marker);
        }

        this.addMarkersToMap();
        this.recenterMap();
    }

    private buildMap() {
        const defaultLayers = this.platform.createDefaultLayers();

        this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.vector.normal.map,
            {
                zoom: 10,
                center: {
                    lat: 45.7309454,
                    lng: 21.2677993,
                },
                pixelRatio: window.devicePixelRatio || 1,
            }
        );

        window.addEventListener('resize', () => this.map.getViewPort().resize());

        // Enable the event system on the search-address-map instance:
        const mapEvents = new H.mapevents.MapEvents(this.map);

        this.behavior = new H.mapevents.Behavior(mapEvents);

        // create default UI with layers provided by the platform
        this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
        this.addClickEventListener();
    }

    private createProfileMarker() {
        if (this.profileMarker) {
            if (this.markersGroup) {
                this.markersGroup.removeObject(this.profileMarker);
            }
        }

        this.profileMarker = this.mapsService.buildMarkerWith(this.myProfile.address.location, 'green', 'I');
        this.profileMarker.setData('Poziția ta curentă: <br/> ' + this.myProfile.address.address);
        this.markersGroup.addObject(this.profileMarker);

        this.addMarkersToMap();
        this.recenterMap();
    }

    private recenterMap() {
        this.map.getViewModel().setLookAtData({
            bounds: this.markersGroup.getBoundingBox(),
        });
    }

    private addMarkersToMap() {
        if (this.markersGroupAdded) {
            return;
        }
        this.markersGroupAdded = true;
        this.map.addObject(this.markersGroup);
    }

    private addClickEventListener() {
        // add 'tap' event listener, that opens info bubble, to the group
        this.markersGroup.addEventListener('tap', (evt) => {
            // event target is the marker itself, group is a parent event target
            // for all objects that it contains
            this.selectedBag = evt.target.getData();
        }, false);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.products && changes.products.currentValue && !changes.products.firstChange) {
            if (this.mapLoaded) {
                this.addProductMarkers();
                this.selectedBag = null;
            }
        }
    }
}

export interface LocationBag {
    address: AddressModel;
    products: ProductModel[];
}

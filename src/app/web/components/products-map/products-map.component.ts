import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '@env/environment';
import { ProductModel } from '@core/models/product';
import { group } from '@angular/animations';
import { of } from 'rxjs';

declare var H: any;

@Component({
    selector: 'app-products-map',
    templateUrl: './products-map.component.html',
    styleUrls: ['./products-map.component.scss'],
})
export class ProductsMapComponent {
    public svgMarkup: string;

    public constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);

        this.svgMarkup = '<svg width="30" height="30" ' +
            'xmlns="http://www.w3.org/2000/svg">' +
            '<rect stroke="white" fill="#d50000" x="1" y="1" width="22" ' +
            'height="22" /></svg>';
    }

    @Input() public products: ProductModel[];

    @ViewChild('map', { static: true })
    public mapElement: ElementRef;
    private platform: any;
    private map: any;
    private ui: any;
    private behavior: any;
    // @ts-ignore
    private markers = new H.map.Group();

    public hereApiKey = '2yOL_eu8-2JkY7WtJSLNdeOC7FDqzjqDEGHYEFTdQYA';

    public loaded = false;
    private readonly isBrowser: boolean;

    public ngOnInit() {
        if (!this.isBrowser) {
            return;
        }
        this.checkHereMapsLoaded();
    }

    private async checkHereMapsLoaded() {
        if (typeof H === 'undefined' || !H || !H.service || !H.service.Platform) {
            setTimeout(() => {
                this.checkHereMapsLoaded();
            }, 500);
            return;
        }
        this.buildPlatform();
        this.buildMap();
        this.addProductMarkers();
    }

    private buildPlatform() {
        this.loaded = true;
        this.platform = new H.service.Platform({
            apikey: this.hereApiKey,
            useHTTPS: environment.production,
        });
    }

    private addProductMarkers() {

        const productsBySeller = {};

        for (const product of this.products) {
            const sellerId = product.seller.id;
            if (!productsBySeller[sellerId]) {
                productsBySeller[sellerId] = [ product ];
            } else {
                productsBySeller[sellerId].push(product);
            }
        }

        Object.entries(productsBySeller).forEach(([sellerId, products]) => {
            console.log(sellerId, products);
            // if (!initialData || val !== initialData[key]) {
            //     propertiesToUpdate[key] = true;
            // }
        });

        for (const product of this.products) {
            this.createMarker(product.seller.address.location, 'Produs');
        }

        this.map.addObject(this.markers);

        // get geo bounding box for the group and set it to the map
        this.map.getViewModel().setLookAtData({
            bounds: this.markers.getBoundingBox(),
        });
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
            }
        );

        window.addEventListener('resize', () => this.map.getViewPort().resize());

        // Enable the event system on the search-address-map instance:
        const mapEvents = new H.mapevents.MapEvents(this.map);

        this.behavior = new H.mapevents.Behavior(mapEvents);

        // create default UI with layers provided by the platform
        this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
        this.addInfoBubble();
    }

    private createMarker(coordinate, html) {
        const marker = new H.map.Marker(coordinate);
        // add custom data to the marker
        marker.setData(html);
        this.markers.addObject(marker);
    }

    private addInfoBubble() {
        // add 'tap' event listener, that opens info bubble, to the group
        this.markers.addEventListener('tap', (evt) => {
            // event target is the marker itself, group is a parent event target
            // for all objects that it contains
            const bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
                // read custom data
                content: evt.target.getData(),
            });
            // show info bubble
            this.ui.addBubble(bubble);
        }, false);

    }

}

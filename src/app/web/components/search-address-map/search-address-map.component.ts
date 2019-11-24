import {
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    PLATFORM_ID,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '@env/environment';
import { AddressModel } from '@core/models/address.model';

declare var H;

@Component({
    selector: 'app-search-address-map',
    templateUrl: './search-address-map.component.html',
    styleUrls: ['./search-address-map.component.scss'],
})
export class SearchAddressMapComponent implements OnInit, OnChanges {

    public constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    @Output() public locationChange: EventEmitter<any> = new EventEmitter();
    @Input() public initialAddress: AddressModel;

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

        if (this.initialAddress) {
            this.setAddressMarker(this.initialAddress.location);
        }
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
                center: this.initialAddress ? this.initialAddress.location : {
                    lat: 45.7309454,
                    lng: 21.2677993,
                },
            }
        );

        window.addEventListener('resize', () => this.map.getViewPort().resize());

        // Enable the event system on the search-address-map instance:
        const mapEvents = new H.mapevents.MapEvents(this.map);

        this.behavior = new H.mapevents.Behavior(mapEvents);

        // disable the default draggability of the underlying search-address-map
        // and calculate the offset between mouse and target's position
        // when starting to drag a marker object:
        this.map.addEventListener('dragstart', (ev) => {
            const target = ev.target,
                pointer = ev.currentPointer;
            if (target instanceof H.map.Marker) {
                const targetPosition = this.map.geoToScreen(target.getGeometry());
                target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
                this.behavior.disable();
            }
        }, false);


        // re-enable the default draggability of the underlying search-address-map
        // when dragging has completed
        this.map.addEventListener('dragend', (ev) => {
            const target = ev.target;
            if (target instanceof H.map.Marker) {
                this.behavior.enable();
                this.locationChange.emit(this.marker.getGeometry());
            }
        }, false);

        // Listen to the drag event and move the position of the marker
        // as necessary
        this.map.addEventListener('drag', (ev) => {
            const target = ev.target,
                pointer = ev.currentPointer;
            if (target instanceof H.map.Marker) {
                target.setGeometry(this.map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
            }
        }, false);
    }

    private setAddressMarker(position) {
        if (this.marker) {
            this.map.removeObject(this.marker);
            this.marker = null;
        }
        this.marker = new H.map.Marker(position, {volatility: true});
        this.marker.draggable = true;
        this.map.addObject(this.marker);
        this.map.setCenter(position);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.initialAddress && changes.initialAddress.currentValue) {
            if (this.initialAddress && this.mapLoaded && this.map) {
                this.setAddressMarker(this.initialAddress.location);
            }
        }
    }
}

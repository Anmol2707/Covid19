/// <reference types="@types/googlemaps" />
import { Component, OnInit, ɵɵupdateSyntheticHostBinding, ViewEncapsulation } from '@angular/core';
import { Car } from './domain/car';
import { CarService } from './services/carservice';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Datapoint } from './Interfaces/Datapoint';
import { NinjaCountry } from './Interfaces/NinjaCountry';
import { TotalData } from './Interfaces/totaldata';

declare var google: any;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [CarService]
})
export class AppComponent implements OnInit {
    options: any;
    markers: Observable<any>;
    countryUrl = 'https://corona.lmao.ninja/v2/countries?sort=country';
    totaldataUrl = 'https://corona.lmao.ninja/all';
    Provinceurl_header = 'https://api.covid19api.com/country/';
    Provinceurl_footer = '/status/confirmed/live';
    items = [];
    overlays: any[];
    rawData: string;
    resp: object;
    dataPoints: Datapoint[];
    countryDatapoints: NinjaCountry[];
    map: google.maps.Map;
    date1: Date;
    Countries: string[];
    Provinces: Map<string, string>;
    totalData: TotalData;

    constructor(private http: HttpClient) {
        this.initialize();

        // fetching total data
        this.fetchTotalData();
        // fetching data for countries
        this.fetchDataForCountries();

        // fetch data for Provinces
        this.fetchDataForProvinces();
      }

    private fetchDataForCountries() {
        this.http.get<NinjaCountry[]>(this.countryUrl).toPromise().then(data => {
            this.countryDatapoints = data;
            this.Countries.forEach(x => this.makeCountryMarker(x));
        });
    }

    private fetchDataForProvinces() {
        for (const key in this.Provinces) {
            if (this.Provinces.hasOwnProperty(key)) {
                this.http.get<Datapoint[]>(this.Provinceurl_header + `${this.Provinces[key]}` + this.Provinceurl_footer)
                .toPromise().then(data => {
                this.dataPoints = data;
                this.makeProvinceMarker(this.dataPoints, key);
                });
            }
        }

    }
    private fetchTotalData() {
        this.http.get<TotalData>(this.totaldataUrl).toPromise().then(data => {
            this.totalData = data;
        });
    }
    private initialize() {
        this.Countries = [];
        this.Provinces = new Map<string, string>();
        this.overlays = [];
        this.Countries.push('Argentina', 'Austria', 'Australia', 'Belgium', 'Brazil', 'Egypt', 'Finland', 'France', 'Germany',
        'India', 'Indonesia', 'Ireland', 'Israel', 'Japan', 'Russia', 'Singapore', 'Korea', 'Spain', 'Taiwan',
        'Sweden', 'United Kingdom', 'USA', 'Vietnam', 'China', 'Italy');
        this.Provinces['California, San Diego'] = 'US';
        this.Provinces['Texas, Austin'] = 'US';
        this.Provinces['New South Wales'] = 'Australia';
        this.Provinces['Quebec'] = 'US';
        this.Provinces['Beijing'] = 'China';
        this.Provinces['British Columbia'] = 'Canada';
    }

      makeCountryMarker( Country: any) {
        const countrydata = this.countryDatapoints.filter(x => x.country === Country);
        // countrydata.sort(this.compare);
        console.log(countrydata[0]);
        if (countrydata.length > 0) {
        return this.newMarker(countrydata[0], true);
        }
        console.log(`No valid data found for ${Country}`);
    }

    makeProvinceMarker (countryProvinceData: any, key) {
        const provincedata = countryProvinceData.filter(x => x.Province === key);
        provincedata.sort(this.compare);
        if (provincedata !== undefined) {
            return this.newMarker(provincedata[0], false);
        }
        console.log(`No valid data found for ${key}`);
    }
    newMarker(obj: any, country: boolean) {

        if (country) {
            var marker = new google.maps.Marker({position: {lat: obj.countryInfo.lat, lng: obj.countryInfo.long},
                animation: google.maps.Animation.DROP , title: ''});
            var circle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: Map,
                center: {lat: obj.countryInfo.lat, lng: obj.countryInfo.long},
                radius: obj.cases * 10
              });

            const infowindow_small = new google.maps.InfoWindow({
                content: `<b>${obj.country}</b></br>
                        <b>Cases :${obj.cases}</b>`,
            });
            const infowindow_large = new google.maps.InfoWindow({
                content: `<b>${obj.country}</b></br>
                        <b>Cases :${obj.cases}</b></br>
                        <b>Deaths :${obj.deaths}</b></br>
                        <b>Recovered :${obj.recovered}</b></br>`,
            });
            infowindow_small.open(this.map, marker);
            marker.addListener('click', function() {
                infowindow_large.close();
                infowindow_large.open(this.map, marker);
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                  } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                  }
            });
            marker.addListener('mouseover', function() {
                infowindow_large.open(this.map, marker);
                infowindow_small.close();
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                  } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                  }
            });
            marker.addListener('mouseout', function() {
                infowindow_small.open(this.map, marker);
                infowindow_large.close();
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                  } else {
                    marker.setAnimation(null);
                  }
            });
            this.overlays.push(marker);
            this.overlays.push(circle);
        } else {
            var marker = new google.maps.Marker({position: {lat: obj.Lat, lng: obj.Lon},
                animation: google.maps.Animation.DROP, title: ''});
            var circle = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: Map,
                    center: {lat: obj.Lat, lng: obj.Lon},
                    radius: obj.Cases * 10
                  });
            const infowindow = new google.maps.InfoWindow({
                content: `<b>${obj.Province}</b></br>
                        <b>Cases :${obj.Cases}</b>`,
            });
            infowindow.open(this.map, marker);
            marker.addListener('click', function() {
                infowindow.open(this.map, marker);
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                  } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                  }
            });
            marker.addListener('mouseover', function() {
                infowindow.open(this.map, marker);
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                  } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                  }
            });
            marker.addListener('mouseout', function() {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                  } else {
                    marker.setAnimation(null);
                  }
            });


            this.overlays.push(marker);
            this.overlays.push(circle);
        }
    }

    setMap(event) {
        this.map = event.map;
    }


    ngOnInit() {
        this.options = {
            center: {lat: 36.890257, lng: 30.707417},
            zoom: 2.49
        };
    }



    compare(a, b) {
        if (a.Cases > b.Cases) {
            return -1;
        }
        if (b.Cases > a.Cases) {
            return 1;
        }

        return 0;
    }
}

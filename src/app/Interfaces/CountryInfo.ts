export class countryInfo {
    _id: number;
    country: string;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: number;

    constructor(Response: any) {
        this._id = Response._id;
        this.country = Response.country;
        this.iso2 = Response.iso2;
        this.iso3 = Response.iso3;
        this.lat = Response.lat;
        this.long = Response.long;
        this.flag = Response.flag;
    }
}

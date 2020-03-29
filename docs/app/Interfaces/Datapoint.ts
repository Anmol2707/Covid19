export class Datapoint {
    Country: string;
    Province: string;
    Lat: number;
    Lon: number;
    Date: Date;
    Cases: number;
    Status: string;

    constructor(Response: any) {
        this.Country = Response.Country;
        this.Province = Response.Province;
        this.Lat = Response.Lat;
        this.Lon = Response.Lon;
        this.Date = Response.Date;
        this.Cases = Response.Cases;
        this.Status = Response.Status;
    }
}

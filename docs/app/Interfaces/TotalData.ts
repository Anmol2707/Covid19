export class TotalData {
    cases: number;
    deaths: number;
    recovered: number;
    updated: number;
    active: number;

    constructor(Response: any) {
        this.cases = Response.cases;
        this.deaths = Response.deaths;
        this.recovered = Response.recovered;
        this.updated = Response.updated;
        this.active = Response.active;
    }
}
